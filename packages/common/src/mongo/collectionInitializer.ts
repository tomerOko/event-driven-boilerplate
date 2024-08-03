// instead of updating, we only finding, inserting and deleting (if we would like to update, we can find, update gere and reinsert the document with the new data)
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
  WithId,
} from 'mongodb';
import { v4 } from 'uuid';
import * as zod from 'zod';

import { db } from './connect';

/**
 * CollectionInitializerProps
 */
export type CollectionInitializerProps<T extends Document> = {
  collectionName: string;
  documentSchema: zod.Schema<T, any, any>;
  indexSpecs: IndexDescription[];
};

type CollectionWithValidation<T extends Document> = Collection<T> & {
  insertOneUnsafely: (doc: OptionalUnlessRequiredId<T>, options?: InsertOneOptions | undefined) => Promise<InsertOneResult<T>>;
  insertManyUnsafely: (docs: OptionalUnlessRequiredId<T>[], options?: BulkWriteOptions) => Promise<InsertManyResult<T>>;
  updateOneUnsafely: (filter: Filter<T>, update: UpdateFilter<T> | Document, options?: UpdateOptions) => Promise<UpdateResult<T>>;
  updateManyUnsafely: (
    filter: Filter<T>,
    update: UpdateFilter<T> | Document[],
    options?: UpdateOptions,
  ) => Promise<UpdateResult<T>>;
};

export type CustomCollection<T extends Document> = Omit<
  Collection<T>,
  'insertOne' | 'insertMany' | 'updateOne' | 'updateMany'
> & {
  insertOne: (doc: WithOptionalID<T>, options?: InsertOneOptions | undefined) => Promise<string>;
  insertMany: (docs: WithOptionalID<T>[], options?: BulkWriteOptions) => Promise<Array<string>>;
  updateOne: (filter: Filter<T>, update: UpdateFilter<T> | Document, options?: UpdateOptions) => Promise<UpdateResult<T>>;
  updateMany: (filter: Filter<T>, update: UpdateFilter<T> | Document[], options?: UpdateOptions) => Promise<UpdateResult<T>>;
};

export type WithOptionalID<T extends Document> = Omit<T, 'ID'> & {
  ID?: string;
};

/**
 * collectionInitializer
 * @ description: This function initializes a collection with validations so that we can validate the documents on inserting/updating and also at finding
 */
export const collectionInitializer = async <T extends Document>(props: CollectionInitializerProps<T>) => {
  const collection = db.collection<T>(props.collectionName) as CollectionWithValidation<T>;
  await collection.createIndexes([
    ...props.indexSpecs,
    {
      key: {
        ID: 1,
      },
      unique: true,
    },
  ]);

  collection.insertOneUnsafely = collection.insertOne;
  collection.insertManyUnsafely = collection.insertMany;
  collection.updateOneUnsafely = collection.updateOne;
  collection.updateManyUnsafely = collection.updateMany;

  const customCollection = collection as any as CustomCollection<T>;

  customCollection.insertOne = async (doc: WithOptionalID<T>, options?: InsertOneOptions | undefined): Promise<string> => {
    doc.ID = doc.ID || v4();
    const validation = props.documentSchema.safeParse(doc);
    if (!validation.success) {
      throw new Error(JSON.stringify(validation.error));
    }
    await collection.insertOneUnsafely(doc as any, options);
    return doc.ID;
  };

  customCollection.insertMany = async (docs: WithOptionalID<T>[], options?: BulkWriteOptions): Promise<string[]> => {
    const ids: Array<string> = [];
    docs.forEach((doc) => {
      doc.ID = doc.ID || v4();
      ids.push(doc.ID);
      const validation = props.documentSchema.safeParse(doc);
      if (!validation.success) {
        throw new Error(JSON.stringify(validation.error));
      }
    });
    await collection.insertManyUnsafely(docs as any, options);
    return ids;
  };

  customCollection.updateOne = async (
    filter: Filter<T>,
    update: UpdateFilter<T> | Document,
    options?: UpdateOptions,
  ): Promise<UpdateResult<T>> => {
    const testCollection = db.collection<T>(`test_${props.collectionName}`);
    await testCollection.deleteMany({});
    const matchDocument = await collection.findOne(filter);
    if (matchDocument || options?.upsert) {
      await updateOrUpsertTest<T>(matchDocument, testCollection, filter, update, options);
      const updatedTestDocument = await testCollection.findOne(filter);
      const testValidation = props.documentSchema.safeParse(updatedTestDocument);
      if (!testValidation.success) {
        throw new Error(JSON.stringify(testValidation.error));
      }
    }
    const result = await collection.updateOneUnsafely(filter, update, options);
    return result;
  };

  customCollection.updateMany = async (
    filter: Filter<T>,
    update: UpdateFilter<T> | Document[],
    options?: BulkWriteOptions,
  ): Promise<UpdateResult<T>> => {
    const testCollection = db.collection<T>(`test_${props.collectionName}`);
    await testCollection.deleteMany({});
    const document = await collection.findOne(filter);

    if (document) {
      await testCollection.insertOne(document as any);
      testCollection.updateMany(filter, update, options);
      const updatedTestDocument = await testCollection.findOne(filter);
      const testValidation = props.documentSchema.safeParse(updatedTestDocument);
      if (!testValidation.success) {
        throw new Error(JSON.stringify(testValidation.error));
      }
    }

    const result = await collection.updateManyUnsafely(filter, update, options);

    return result;
  };

  return customCollection;
};

async function updateOrUpsertTest<T extends Document>(
  matchDocument: WithId<T> | null,
  testCollection: Collection<T>,
  filter: Filter<T>,
  update: Document | UpdateFilter<T>,
  options: UpdateOptions | undefined,
) {
  if (matchDocument) {
    await testCollection.insertOne(matchDocument as any);
    testCollection.updateOne(filter, update, options);
  } else {
    const document = {
      ID: v4(),
      ...filter,
      ...update,
    };
    await testCollection.insertOne(document as any);
  }
}
