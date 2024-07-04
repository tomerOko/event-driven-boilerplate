import { connect } from "../npm/mongo";

const mongoHost = 'add-payment-mon';  // This should match the name of your MongoDB service in Kubernetes
const mongoPort = '27017';    // This should match the port MongoDB is exposed on
const dbName = 'main';         // This should match the name of the database you want to connect to
const url = `mongodb://${mongoHost}:${mongoPort}`;
const externalUrl = `mongodb://localhost:27002`;

export const connectToMongo = async () => {
    try {
        const currentUrl = process.env.DEV_ENVIRONMENT === 'EXTERNAL' ? externalUrl : url;
        await connect(currentUrl, dbName);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB', error);
    }
}

