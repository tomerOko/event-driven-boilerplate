import { Db, MongoClient } from 'mongodb';

let client: MongoClient;
export let db: Db;

export const connect = async (uri: string, dbName: string) => {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
  }
};

export const close = async () => {
  if (client) {
    await client.close();
  }
};
