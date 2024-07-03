// instead of updating, we only finding, inserting and deleting (if we would like to update, we can find, update gere and reinsert the document with the new data)

import { BulkWriteOptions, Collection, Db, Document, Filter, IndexDescription, InsertManyResult, InsertOneOptions, InsertOneResult, OptionalUnlessRequiredId, UpdateFilter, WithId  } from 'mongodb';
import * as z from 'zod';
import {db} from './connect';

export type CollectionInitializerProps<T extends Document> = {
    collectionName: string,
    documentSchema: z.ZodSchema<T>,
    indexSpecs: IndexDescription[]
}

type CollectionWithValidation<T extends Document> = Collection<T> & {
    insertOneUnsafely:(doc: OptionalUnlessRequiredId<T>, options?: InsertOneOptions | undefined) => Promise<InsertOneResult<T>>,
    insertManyUnsafely: (docs: OptionalUnlessRequiredId<T>[], options?: BulkWriteOptions) => Promise<InsertManyResult<T>>,
    updateOneUnsafely: (filter: Filter<T>, update: UpdateFilter<T> | Document, options?: BulkWriteOptions) => Promise<any>,
    updateManyUnsafely: (filter: Filter<T>, update: UpdateFilter<T> | Document[], options?: BulkWriteOptions) => Promise<any>
}


export const collectionInitializer = async <T extends Document> (props: CollectionInitializerProps<T>) => {
    const collection = db.collection<T>(props.collectionName) as Collection<T> & CollectionWithValidation<T>;
    await collection.createIndexes(props.indexSpecs);

    collection.insertOneUnsafely = collection.insertOne;
    collection.insertManyUnsafely = collection.insertMany;
    collection.updateOneUnsafely = collection.updateOne;
    collection.updateManyUnsafely = collection.updateMany;


    collection.insertOne = async (
      doc: OptionalUnlessRequiredId<T>, 
      options?: InsertOneOptions | undefined
    ) : Promise<InsertOneResult<T>> => {
      const validation = props.documentSchema.safeParse(document);
      if (!validation.success) {
        throw new Error(JSON.stringify(validation.error));
      }
      const result = await collection.insertOneUnsafely(doc as any, options);
      return result
    }

    collection.insertMany = async (
      docs: OptionalUnlessRequiredId<T>[], 
      options?: BulkWriteOptions
    ) : Promise<InsertManyResult<T>> => {
      docs.forEach(doc => {
        const validation = props.documentSchema.safeParse(doc);
        if (!validation.success) {
          throw new Error(JSON.stringify(validation.error));
        }
      });
      const result = await collection.insertManyUnsafely(docs as any, options);
      return result 
    }

    collection.updateOne = async (
      filter: Filter<T>, 
      update: UpdateFilter<T> | Document, 
      options?: BulkWriteOptions
    ) : Promise<any> => {
      const testCollection = db.collection<T>(`test_${props.collectionName}`);
      await testCollection.deleteMany({});
      const document = await collection.findOne(filter);
      if (document) {
        await testCollection.insertOne(document as any);
        testCollection.updateOne(filter, update, options);
        const updatedTestDocument = await testCollection.findOne(filter);
        const testValidation = props.documentSchema.safeParse(updatedTestDocument);
        if (!testValidation.success) {
          throw new Error(JSON.stringify(testValidation.error));
        }
      }
      const result = await collection.updateOneUnsafely(filter, update, options);
      return result;
    }

    collection.updateMany = async (
      filter: Filter<T>,
      update: UpdateFilter<T> | Document[],
      options?: BulkWriteOptions
    ) : Promise<any> => {

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
      
      const result = await collection.updateManyUnsafely(filter,update, options);
      
      return result;
    }

    return collection;
}



    