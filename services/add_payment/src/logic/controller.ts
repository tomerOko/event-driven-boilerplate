import { NextFunction, Request, Response } from 'express';
import * as service from './service';

export const test = (req: Request, res: Response, next: NextFunction) => {
  console.log('GET /test');
  res.send('Test route');
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  console.log('GET /allUsers');
  const allUsers = await service.getAllUsers();
  res.send(allUsers);
};

/**
 * create post put delete
 */

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log('POST /createUser');
  await service.createUser(req.body);
  res.send('User created');
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log('PUT /updateUser');
  await service.updateUser(req.body);
  res.send('User updated');
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log('DELETE /deleteUser');
  await service.deleteUser(req.body);
  res.send('User deleted');
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  console.log('GET /getUserById');
  const user = await service.getUserById(req.body);
  res.send(user);
}


