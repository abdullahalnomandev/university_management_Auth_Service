import httpsStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utils';
const createStudent = async (student:IStudent,user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  // const academicSemester: IAcademicSemester = {
  //   title: 'Fall',
  //   year: '2040',
  //   code: '03',
  //   startMonth: 'January',
  //   endMonth: 'December',
  // };
  // const id = await generatedStudentId();

  // user.id = id as string;
  // default password
  if (!user.password) {
    user.password = config.default_student_password as string;
  }

  // set role
  user.role = 'student';
  const academicSemester = await AcademicSemester.findById(student.academicSemester);
  
// generate student id
 const id = await generatedStudentId(academicSemester)
 console.log(id);
 
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(httpsStatus.BAD_REQUEST, 'Failed to create user');
  }

  return createdUser;
};

export const UserService = {
  createStudent,
};
