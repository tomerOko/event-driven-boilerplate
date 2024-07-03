import { Db, MongoClient } from 'mongodb';

let client: MongoClient;
export let db: Db;

export const connect = async (uri: string, dbName: string) =>  {
  try {
    if (!client) {
      client = new MongoClient(uri);
      await client.connect();
      db = client.db(dbName);
    }
  } catch (error) {
    console.log('Error connecting to MongoDB', error);
  }
}

export const close = async () => {
  if (client) {
    await client.close();
  }
}
