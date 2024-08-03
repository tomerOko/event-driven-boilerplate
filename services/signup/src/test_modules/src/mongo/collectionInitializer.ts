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

import { formatZodError } from '../errors';
import { functionWrapper } from '../logging';

import { db } from './connect';

export type CollectionInitializerProps<T extends Document> = {
  collectionName: string;
  documentSchema: zod.Schema<T, any, any>;
  indexSpecs: IndexDescription[];
};

type UnsafeCollectioin<T extends Document> = Collection<T> & {
  insertOneUnsafely: (doc: OptionalUnlessRequiredId<T>, options?: InsertOneOptions) => Promise<InsertOneResult<T>>;
  insertManyUnsafely: (docs: OptionalUnlessRequiredId<T>[], options?: BulkWriteOptions) => Promise<InsertManyResult<T>>;
  updateOneUnsafely: (filter: Filter<T>, update: UpdateFilter<T> | Document, options?: UpdateOptions) => Promise<UpdateResult<T>>;
  updateManyUnsafely: (
    filter: Filter<T>,
    update: UpdateFilter<T> | Document[],
    options?: UpdateOptions,
  ) => Promise<UpdateResult<T>>;
};

export type UpdateProps<T extends Document> = {
  filter: Filter<T>;
  update: UpdateFilter<T>;
  options: UpdateOptions | undefined;
};

export type SafeCollection<T extends Document> = Omit<Collection<T>, 'insertOne' | 'insertMany' | 'updateOne' | 'updateMany'> & {
  insertOne: (doc: OptionalID<T>, options?: InsertOneOptions) => Promise<string>;
  insertMany: (docs: OptionalID<T>[], options?: BulkWriteOptions) => Promise<string[]>;
  updateOne: (filter: Filter<T>, update: UpdateFilter<T>, options?: UpdateOptions) => Promise<UpdateResult<T>>;
  updateMany: (filter: Filter<T>, update: UpdateFilter<T>, options?: UpdateOptions) => Promise<UpdateResult<T>>;
};

export type OptionalID<T extends Document> = Omit<T, 'ID'> & {
  ID?: string;
};

export type WithID<T extends Document> = T & {
  ID?: string;
};

export class CollectionInitializer<T extends Document> {
  private props: CollectionInitializerProps<T>;
  private collection: UnsafeCollectioin<T> | undefined;
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

  private async initializeNativeCollection(): Promise<UnsafeCollectioin<T>> {
    return functionWrapper(async () => {
      const collection = db.collection<T>(this.props.collectionName);
      await collection.createIndexes([
        ...this.props.indexSpecs,
        {
          key: {
            ID: 1,
          },
          unique: true,
        },
      ]);
      (collection as UnsafeCollectioin<T>).insertOneUnsafely = collection.insertOne;
      (collection as UnsafeCollectioin<T>).insertManyUnsafely = collection.insertMany;
      (collection as UnsafeCollectioin<T>).updateOneUnsafely = collection.updateOne;
      (collection as UnsafeCollectioin<T>).updateManyUnsafely = collection.updateMany;
      return collection as UnsafeCollectioin<T>;
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
        await (this.collection as UnsafeCollectioin<T>).insertOneUnsafely(doc as any, options);
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
        await (this.collection as UnsafeCollectioin<T>).insertManyUnsafely(docs as any, options);
        return ids;
      });
    };
    return insertMany;
  }

  private updateOneFactory() {
    const updateOne = async (
      filter: Filter<T>,
      update: UpdateFilter<T> | Document,
      options?: UpdateOptions,
    ): Promise<UpdateResult<T>> => {
      return functionWrapper(async () => {
        const matchDocument = (await (this.collection as UnsafeCollectioin<T>).findOne(filter)) as WithID<T> | null;
        const willChange = matchDocument || options?.upsert;
        const updateProps = { filter, update, options };
        if (willChange) {
          await this.validateUpdateQueryOnTestCollection(matchDocument, updateProps);
        }
        return (this.collection as UnsafeCollectioin<T>).updateOneUnsafely(filter, update, options);
      });
    };
    return updateOne;
  }

  private async validateUpdateQueryOnTestCollection(matchDocument: WithID<T> | null, UpdateProps: UpdateProps<T>) {
    return functionWrapper(async () => {
      const testCollection = db.collection<T>(`test_${this.props.collectionName}`);
      await testCollection.deleteMany({});
      const { filter, update, options } = UpdateProps;
      if (matchDocument) {
        await testCollection.insertOne(matchDocument as any);
      } else {
        const document = { ID: uuidv4(), ...filter };
        await testCollection.insertOne(document as any);
      }
      await testCollection.updateOne(filter, update, options);
      const updatedTestDocument = await testCollection.findOne(filter);
      const testValidation = this.props.documentSchema.safeParse(updatedTestDocument);
      if (!testValidation.success) {
        const error = formatZodError(testValidation.error);
        throw new Error(`UpdateOne Test Validation Error: ${JSON.stringify(testValidation.error)}`);
      }
    });
  }

  private UpdateManyFactory() {
    const updateMany = async (filter: Filter<T>, update: UpdateFilter<T>, options?: UpdateOptions): Promise<UpdateResult<T>> => {
      const testCollection = db.collection<T>(`test_${this.props.collectionName}`);
      await testCollection.deleteMany({});
      const document = await (this.collection as UnsafeCollectioin<T>).findOne(filter);

      if (document) {
        await testCollection.insertOne(document as any);
        await testCollection.updateMany(filter, update, options);
        const updatedTestDocument = await testCollection.findOne(filter);
        const testValidation = this.props.documentSchema.safeParse(updatedTestDocument);
        if (!testValidation.success) {
          throw new Error(`UpdateMany Test Validation Error: ${JSON.stringify(testValidation.error)}`);
        }
      }
      return (this.collection as UnsafeCollectioin<T>).updateManyUnsafely(filter, update, options);
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
