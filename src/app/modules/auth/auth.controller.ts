import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse } from './auth.interface';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  const {refreshToken,...others} = result;

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly:true
  }
  res.cookie('refreshToken', refreshToken ,cookieOptions)
 
  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    status: 'success',
    message: 'User logged in successfully',
    data: others
  });
});

export const AuthController = {
  loginUser,
};

// login --> default password --> change password -->needsPasswordChange --> true | false
