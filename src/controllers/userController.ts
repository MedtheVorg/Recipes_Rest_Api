import { NextFunction, Request, Response } from 'express';
import { User } from '../models/userModel';
import { HttpCode } from '../utils/AppError';

/**
 * @method GET
 * @description Get all Users
 * @path /users
 */
const readAllUser = async (req: Request, res: Response, next: NextFunction) => {
  const users = await User.find().exec();
  res.status(HttpCode.OK).json({ users: users });
};

/**
 * @method GET
 * @description Get User by ID
 * @path /users/:userID
 */
const readUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userID } = req.params;
  const user = await User.findById(userID, { __v: 0 }).exec();
  user
    ? res.status(HttpCode.OK).json(user)
    : res.status(HttpCode.NOT_FOUND).json({ message: 'User not found' });
};

/**
 * @method POST
 * @description Create User
 * @path /users
 */
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const {
    body: { username, password },
  } = req;
  const alreadyExists = await User.find({ username: username }).exec();

  if (Object.keys(alreadyExists).length > 0) {
    return res
      .status(HttpCode.CONFLICT)
      .json({ message: 'user already exists.' });
  }
  const createdUser = User.build({ username, password, isAdmin: false });
  await createdUser.save();

  res
    .status(HttpCode.CREATED)
    .json({ success: true, message: 'user created successfully' });
};

/**
 * @method PATCH
 * @description Update User
 * @path /users/:userID
 */
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  //TODO
};

/**
 * @method DELETE
 * @description Delete User
 * @path /users/:userID
 */
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  //TODO
};

export { createUser, readAllUser, readUser, updateUser, deleteUser };
