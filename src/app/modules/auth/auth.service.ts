import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../users/user.interface';
import { User } from '../users/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<Partial<IUser>> => {
  const { id, password } = payload;

  const user = new User();

  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (isUserExist && !user.isPasswordMatch(password, isUserExist?.password)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  return {};
};

export const AuthService = {
  loginUser,
};
