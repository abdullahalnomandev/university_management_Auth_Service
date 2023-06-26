import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body;
    const result = await UserService.createUser(userData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: 'success',
      message: 'User created successfully.',
      data: result,
    });
  }
);

export const UserController = {
  createUser,
};
