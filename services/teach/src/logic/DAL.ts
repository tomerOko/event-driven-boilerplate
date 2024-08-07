import { OptionalID, functionWrapper } from 'common-lib-tomeroko3';

import { Teacher, Topic, User, teachersCollection, topicsCollection, usersCollection } from '../configs/mongoDB/initialization';

export const createTeacher = async (teacher: OptionalID<Teacher>) => {
  return functionWrapper(async () => {
    const ID = await teachersCollection.insertOne(teacher);
    return ID;
  });
};

export const getTeacherByID = async (ID: string) => {
  return functionWrapper(async () => {
    const teacher = await teachersCollection.findOne({ ID });
    return teacher;
  });
};

export const getTeacherByUserID = async (userID: string) => {
  return functionWrapper(async () => {
    const teacher = await teachersCollection.findOne({ userID });
    return teacher;
  });
};

export const getTeachers = async (filter: Partial<Teacher>) => {
  return functionWrapper(async () => {
    const teachers = await teachersCollection.find(filter).toArray();
    return teachers;
  });
};

export const updateTeacherByID = async (ID: string, update: Partial<Teacher>) => {
  return functionWrapper(async () => {
    await teachersCollection.updateOne({ filter: { ID }, update, options: {} });
  });
};

export const deleteTeacherByID = async (ID: string) => {
  return functionWrapper(async () => {
    await teachersCollection.deleteOne({ ID });
  });
};

export const createUser = async (user: User) => {
  return functionWrapper(async () => {
    await usersCollection.insertOne(user);
  });
};

export const getUserByID = async (ID: string) => {
  return functionWrapper(async () => {
    const user = await usersCollection.findOne({ ID });
    return user;
  });
};

export const getUsers = async (filter: Partial<User>) => {
  return functionWrapper(async () => {
    const users = await usersCollection.find(filter).toArray();
    return users;
  });
};

export const updateUserByID = async (ID: string, update: Partial<User>) => {
  return functionWrapper(async () => {
    await usersCollection.updateOne({ filter: { ID }, update, options: {} });
  });
};

export const deleteUserByID = async (ID: string) => {
  return functionWrapper(async () => {
    await usersCollection.deleteOne({ ID });
  });
};

export const createTopic = async (topic: OptionalID<Topic>) => {
  return functionWrapper(async () => {
    const ID = await topicsCollection.insertOne(topic);
    return ID;
  });
};

export const getTopicByID = async (ID: string) => {
  return functionWrapper(async () => {
    const topic = await topicsCollection.findOne({ ID });
    return topic;
  });
};

export const getTopics = async (filter: Partial<Topic>) => {
  return functionWrapper(async () => {
    const topics = await topicsCollection.find(filter).toArray();
    return topics;
  });
};

export const updateTopicByID = async (ID: string, update: Partial<Topic>) => {
  return functionWrapper(async () => {
    await topicsCollection.updateOne({ filter: { ID }, update, options: {} });
  });
};

export const deleteTopicByID = async (ID: string) => {
  return functionWrapper(async () => {
    await topicsCollection.deleteOne({ ID });
  });
};
