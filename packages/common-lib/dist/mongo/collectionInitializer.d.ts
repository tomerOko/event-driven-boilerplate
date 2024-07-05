import { BulkWriteOptions, Collection, Document, Filter, IndexDescription, InsertManyResult, InsertOneOptions, InsertOneResult, OptionalUnlessRequiredId, UpdateFilter } from 'mongodb';
import * as zod from 'zod';
export type CollectionInitializerProps<T extends Document> = {
    collectionName: string;
    documentSchema: zod.Schema<T, any, any>;
    indexSpecs: IndexDescription[];
};
export declare const collectionInitializer: <T extends Document>(props: CollectionInitializerProps<T>) => Promise<Collection<T> & {
    insertOneUnsafely: (doc: OptionalUnlessRequiredId<T>, options?: InsertOneOptions | undefined) => Promise<InsertOneResult<T>>;
    insertManyUnsafely: (docs: OptionalUnlessRequiredId<T>[], options?: BulkWriteOptions) => Promise<InsertManyResult<T>>;
    updateOneUnsafely: (filter: Filter<T>, update: Document | UpdateFilter<T>, options?: BulkWriteOptions) => Promise<any>;
    updateManyUnsafely: (filter: Filter<T>, update: Document[] | UpdateFilter<T>, options?: BulkWriteOptions) => Promise<any>;
}>;
