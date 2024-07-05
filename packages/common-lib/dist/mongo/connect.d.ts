import { Db } from 'mongodb';
export declare let db: Db;
export declare const connect: (uri: string, dbName: string) => Promise<void>;
export declare const close: () => Promise<void>;
