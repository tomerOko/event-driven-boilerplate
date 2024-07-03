import { Collection } from "mongodb";
import { CollectionInitializerProps, collectionInitializer } from "../npm/mongo";
import { Payment } from "./typesAndConsts";
import { paymentValidation } from "./validations";

const collectionInitializerProps : CollectionInitializerProps<Payment> = {
    collectionName: 'payments',
    documentSchema: paymentValidation,
    indexSpecs: [
        { key: { _id: 1 }, name: 'cardNumber' }
    ]
}

let paymentsCollection: Collection<Payment>;

export const initPaymentsCollection = async () => {
    paymentsCollection = await collectionInitializer(collectionInitializerProps);
}
 


export const getAllPayments = async () => {
    const payments = await  paymentsCollection.find().toArray() as any as Payment[];

    return payments;
}

export const createPayment = async (payment: Payment) => {
    await paymentsCollection.insertOne(payment as any);
}

export const updatePayment = async (payment: Payment) => {
    await paymentsCollection.updateOne({ _id: payment._id }, { $set: payment });
}

export const deletePayment = async (paymentId: string) => {
    await paymentsCollection.deleteOne({ _id: paymentId   });
}

export const getPaymentById = async (paymentId: string) => {
    const payment = await paymentsCollection.findOne({ _id: paymentId }) as any as Payment;

    return payment;
}