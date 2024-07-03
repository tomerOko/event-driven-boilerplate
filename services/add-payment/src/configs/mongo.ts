import { Db, MongoClient } from "mongodb";

const mongoHost = 'users-mongodb';  // This should match the name of your MongoDB service in Kubernetes
const mongoPort = '27017';    // This should match the port MongoDB is exposed on
const dbName = 'main';         // This should match the name of the database you want to connect to
const url = `mongodb://${mongoHost}:${mongoPort}`;


export class MongoConnection {
    private static client: MongoClient = new MongoClient(url)
    private static db: Db | null = null;
    
    
    public static async connect(): Promise<void> {
        try {
            await this.client.connect();
            this.db = this.client.db(dbName);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.log('Error connecting to MongoDB', error);
        }
    }
    
    public static getDb(): Db {
        return MongoConnection.db as Db;
    }
}




