import httpsStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utils';
const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const academicSemester: IAcademicSemester = {
    title: 'Fall',
    year: '2040',
    code: '03',
    startMonth: 'January',
    endMonth: 'December',
  };
  const id = await generatedStudentId(academicSemester);

  user.id = id as string;
  // default password
  if (!user.password) {
    user.password = config.default_user_password as string;
  }
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(httpsStatus.BAD_REQUEST, 'Failed to create user');
  }

  return createdUser;
};

export const UserService = {
  createUser,
};
