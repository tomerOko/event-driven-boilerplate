import { Collection, ObjectId } from "mongodb";
import { CollectionInitializerProps, collectionInitializer } from "../npm/mongo";
import { Payment } from "./typesAndConsts";
import { paymentValidation } from "./validations";

const collectionInitializerProps : CollectionInitializerProps<Payment> = {
    collectionName: 'signup',
    documentSchema: paymentValidation,
    indexSpecs: [
        { key: { _id: 1 }, name: 'cardNumber' }
    ]
}

let paymentsCollection: Collection<Payment>;

export const initPaymentsCollection = async () => {
    paymentsCollection = await collectionInitializer(collectionInitializerProps);
}
 
export const getAllPayments = async () : Promise <Payment[]> => {
    const payments = await  paymentsCollection.find().toArray()
    return payments;
}

export const createPayment = async (payment: Payment) => {
    const result = await paymentsCollection.insertOne(payment as any);
    return result.insertedId;
}

export const updatePayment = async (payment: Payment) => {
    await paymentsCollection.updateOne({ _id: payment._id }, { $set: payment });
}

export const deletePayment = async (_id: ObjectId) => {
    await paymentsCollection.deleteOne({ _id });
}

export const getPaymentById = async (_id: ObjectId) => {
    const allPayments = await paymentsCollection.find().toArray() as any as Payment[];
    const asObjectId = new ObjectId(_id);
    const payment2 = await paymentsCollection.findOne({ _id }) as any as Payment;
    const payment = await paymentsCollection.findOne({ _id: asObjectId}) as any as Payment;
    return payment;
}

export const cleanrCollection = async () => {
    await paymentsCollection.deleteMany({});
}