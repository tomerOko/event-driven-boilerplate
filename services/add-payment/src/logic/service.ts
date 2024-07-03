import { User } from "./typesAndConsts";
import * as model from './DAL'
import { getChannel } from "../configs/rabbitConnections";

export const getAllUsers = async () : Promise<Array<User>>=> {
  const users = await model.getAllUsers()
  return users
};

export const createUser = async (user: User) => {
  const queue = 'userQueue';

  try {
    const channel = getChannel();

    channel.assertQueue(queue, {
      durable: false
    });

    const msg = JSON.stringify({ type: 'new user', data: user });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);

  } catch (error) {
    console.error('Error sending message to RabbitMQ', error);
  }
  await model.createUser(user)
}

export const updateUser = async (user: User) => {
  await model.updateUser(user)
}

export const deleteUser = async (userId: string) => {
  await model.deleteUser(userId)
}

export const getUserById = async (userId: string) => {
  const user = await model.getUserById(userId)
  return user
}