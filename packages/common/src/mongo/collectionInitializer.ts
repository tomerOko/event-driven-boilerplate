import {
  BulkWriteOptions,
  Collection,
  Document,
  Filter,
  IndexDescription,
  InsertManyResult,
  InsertOneOptions,
  InsertOneResult,
  OptionalUnlessRequiredId,
  UpdateFilter,
  UpdateOptions,
  UpdateResult,
} from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import * as zod from 'zod';

import { AppError, formatZodError } from '../errors';
import { functionWrapper } from '../logging';

import { db } from './connect';

export type CollectionInitializerProps<T extends Document> = {
  collectionName: string;
  documentSchema: zod.Schema<T, any, any>;
  indexSpecs: IndexDescription[];
};

type UnsafeCollectioin = Collection & {
  insertOneUnsafely: (doc: OptionalUnlessRequiredId<Document>, options?: InsertOneOptions) => Promise<InsertOneResult>;
  insertManyUnsafely: (docs: OptionalUnlessRequiredId<Document>[], options?: BulkWriteOptions) => Promise<InsertManyResult>;
  updateOneUnsafely: (
    filter: Filter<Document>,
    update: UpdateFilter<Document> | Document,
    options?: UpdateOptions,
  ) => Promise<UpdateResult>;
  updateManyUnsafely: (
    filter: Filter<Document>,
    update: UpdateFilter<Document> | Document[],
    options?: UpdateOptions,
  ) => Promise<UpdateResult>;
};

export type UpdateProps<T extends Document> = {
  filter: Partial<T>;
  update: Partial<T>;
  options: UpdateOptions | undefined;
};

export type SafeCollection<T extends Document> = Omit<Collection<T>, 'insertOne' | 'insertMany' | 'updateOne' | 'updateMany'> & {
  insertOne: (doc: OptionalID<T>, options?: InsertOneOptions) => Promise<string>;
  insertMany: (docs: OptionalID<T>[], options?: BulkWriteOptions) => Promise<string[]>;
  updateOne: (props: UpdateProps<T>) => Promise<UpdateResult<T>>;
  updateMany: (props: UpdateProps<T>) => Promise<UpdateResult<T>>;
};

export type OptionalID<T extends Document> = Omit<T, 'ID'> & {
  ID?: string;
};

export type WithID<T extends Document> = T & {
  ID?: string;
};

export class CollectionInitializer<T extends Document> {
  private props: CollectionInitializerProps<T>;
  private collection: UnsafeCollectioin | undefined;
  private customCollection: SafeCollection<T> | undefined;

  constructor(props: CollectionInitializerProps<T>) {
    this.props = props;
  }

  public async initialize(): Promise<SafeCollection<T>> {
    return functionWrapper(async () => {
      this.collection = await this.initializeNativeCollection();
      this.customCollection = this.collection as unknown as SafeCollection<T>;
      this.customCollection.insertOne = this.insertOneFactory();
      this.customCollection.insertMany = this.insertManyFactory();
      this.customCollection.updateOne = this.updateOneFactory();
      this.customCollection.updateMany = this.UpdateManyFactory();
      return this.customCollection;
    });
  }

  private async initializeNativeCollection(): Promise<UnsafeCollectioin> {
    return functionWrapper(async () => {
      const collection = db.collection(this.props.collectionName);
      await collection.createIndexes([
        ...this.props.indexSpecs,
        {
          key: {
            ID: 1,
          },
          unique: true,
        },
      ]);
      (collection as UnsafeCollectioin).insertOneUnsafely = collection.insertOne;
      (collection as UnsafeCollectioin).insertManyUnsafely = collection.insertMany;
      (collection as UnsafeCollectioin).updateOneUnsafely = collection.updateOne;
      (collection as UnsafeCollectioin).updateManyUnsafely = collection.updateMany;
      return collection as UnsafeCollectioin;
    });
  }

  private insertOneFactory() {
    const updateOne = async (doc: OptionalID<T>, options?: InsertOneOptions): Promise<string> => {
      return functionWrapper(async () => {
        doc.ID = doc.ID || uuidv4();
        const validation = this.props.documentSchema.safeParse(doc);
        if (!validation.success) {
          throw new Error(`InsertOne Validation Error: ${JSON.stringify(validation.error)}`);
        }
        await (this.collection as UnsafeCollectioin).insertOneUnsafely(doc as any, options);
        return doc.ID;
      });
    };

    return updateOne;
  }

  private insertManyFactory() {
    const insertMany = async (docs: OptionalID<T>[], options?: BulkWriteOptions): Promise<string[]> => {
      return functionWrapper(async () => {
        const ids: string[] = [];
        for (const doc of docs) {
          doc.ID = doc.ID || uuidv4();
          ids.push(doc.ID);
          const validation = this.props.documentSchema.safeParse(doc);
          if (!validation.success) {
            throw new Error(`InsertMany Validation Error: ${JSON.stringify(validation.error)}`);
          }
        }
        await (this.collection as UnsafeCollectioin).insertManyUnsafely(docs as any, options);
        return ids;
      });
    };
    return insertMany;
  }

  private updateOneFactory() {
    const updateOne = async (props: UpdateProps<T>): Promise<UpdateResult<T>> => {
      return functionWrapper(async () => {
        const { filter, update, options } = props;
        const matchDocument = (await (this.collection as UnsafeCollectioin).findOne(filter)) as WithID<T> | null;
        const willChange = matchDocument || options?.upsert;
        if (willChange) {
          await this.validateUpdateQueryOnTestCollection(matchDocument, props);
        }

        return (this.collection as UnsafeCollectioin).updateOneUnsafely(
          filter,
          [
            {
              $set: {
                ID: { $cond: { if: { $not: '$ID' }, then: uuidv4(), else: '$ID' } },
                ...update,
              },
            },
          ],
          options,
        );
      });
    };
    return updateOne;
  }

  private async validateUpdateQueryOnTestCollection(matchDocument: WithID<T> | null, UpdateProps: UpdateProps<T>) {
    return functionWrapper(async () => {
      const testCollection = db.collection(`test_${this.props.collectionName}`);
      await testCollection.deleteMany({});
      const { filter, update, options } = UpdateProps;
      if (matchDocument) {
        await testCollection.insertOne(matchDocument as any);
        await testCollection.updateOne(filter, { $set: update }, options);
      } else {
        const document = { ID: uuidv4(), ...filter, ...update };
        await testCollection.insertOne(document as any);
      }
      const updatedTestDocument = await testCollection.findOne(filter);
      const testValidationResult = this.props.documentSchema.safeParse(updatedTestDocument);
      if (!testValidationResult.success) {
        const error = formatZodError(testValidationResult.error);
        throw new AppError('UPDATE_ONE_VALIDATION_ERROR', { error, updatedTestDocument });
      }
    });
  }

  private UpdateManyFactory() {
    const updateMany = async (props: UpdateProps<T>): Promise<UpdateResult<T>> => {
      const { filter, update, options } = props;
      const testCollection = db.collection(`test_${this.props.collectionName}`);
      await testCollection.deleteMany({});
      const document = await (this.collection as UnsafeCollectioin).findOne(filter);

      if (document) {
        await testCollection.insertOne(document as any);
        await testCollection.updateMany(filter, update, options);
        const updatedTestDocument = await testCollection.findOne(filter);
        const testValidation = this.props.documentSchema.safeParse(updatedTestDocument);
        if (!testValidation.success) {
          throw new Error(`UpdateMany Test Validation Error: ${JSON.stringify(testValidation.error)}`);
        }
      }
      return (this.collection as UnsafeCollectioin).updateManyUnsafely(filter, { $set: update }, options);
    };

    return updateMany;
  }
}

export const collectionInitializer = async <T extends Document>(props: CollectionInitializerProps<T>) => {
  return functionWrapper(async () => {
    const initializer = new CollectionInitializer(props);
    const customCollection = await initializer.initialize();
    return customCollection;
  });
};
