import { MongoConnection } from "../configs/mongoConnection";
import { User } from "./typesAndConsts";


export const getAllUsers = async () => {
    const users = await  MongoConnection.getDb().collection('users').find().toArray() as any as User[];

    return users;
}

export const createUser = async (user: User) => {
    await MongoConnection.getDb().collection('users').insertOne(user as any);
}

export const updateUser = async (user: User) => {
    await MongoConnection.getDb().collection('users').updateOne({ _id: user._id }, { $set: user });
}

export const deleteUser = async (userId: string) => {
    await MongoConnection.getDb().collection('users').deleteOne({ _id: userId   });
}

export const getUserById = async (userId: string) => {
    const user = await MongoConnection.getDb().collection('users').findOne({ _id: userId }) as any as User;

    return user;
}