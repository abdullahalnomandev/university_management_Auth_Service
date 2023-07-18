import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthService.loginUser(loginData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: 'success',
    message: 'User logged in successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
};

// login --> default password --> change password -->needsPasswordChange --> true | false
