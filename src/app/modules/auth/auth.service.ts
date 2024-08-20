import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { jwtHelper } from '../../../helpers/jwtHelpers';
import { Admin } from '../admin/admin.model';
import { Faculty } from '../faculty/faculty.model';
import { Student } from '../student/student.model';
import { User } from '../users/user.model';

import {
  IChangPassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { sendEmail } from './sendResetMail';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  const user = new User();

  const isUserExist = await user.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist &&
    !(await user.isPasswordMatch(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // create access token & refresh token
  const { id: userId, role, needsPasswordChange } = isUserExist;

  const accessToken = jwtHelper.createToken(
    {
      userId,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelper.createToken(
    {
      userId,
      role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  // console.log({accessToken, refreshToken,needsPasswordChange});

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelper.verifiedToken(
      token,
      config.jwt.refresh_secret as string
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }

  const { userId } = verifiedToken;

  const user = new User();
  const isUserExist = await user.isUserExist(userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // generate new token
  const newAccessToken = jwtHelper.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  userData: JwtPayload | null,
  payload: IChangPassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  const user = new User();
  const isUserExist = await User.findOne({ id: userData?.userId }).select(
    '+password'
  );
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // checking old password
  if (
    isUserExist &&
    !(await user.isPasswordMatch(oldPassword, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, ' Old password is incorrect');
  }

  isUserExist.password = newPassword;
  isUserExist.needsPasswordChange = false;
  isUserExist.save();

  // Alternative way to change the password

  // const newHasPassword = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bycrypt_salt_rounds)
  // );

  // const query = {
  //   id: userData?.userId,
  // };
  // const updatedData = {
  //   password: newHasPassword,
  //   needsPasswordChange: false,
  //   passwordChangeAt: new Date(),
  // };

  // //update password
  // await User.findOneAndUpdate(query, updatedData, { new: true });

  //updating using save()
};


const forgotPassword = async (payload: { id: string }) => {

  const user = await User.findOne({ id: payload.id }, { id: 1, role: 1 });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  let profile = null;

  if (user.role === ENUM_USER_ROLE.ADMIN) {
    profile = await Admin.findOne({ id: user.id })
  }

  else if (user.role === ENUM_USER_ROLE.FACULTY) {
    profile = await Faculty.findOne({ id: user.id })
  }
  else if (user.role === ENUM_USER_ROLE.STUDENT) {
    profile = await Student.findOne({ id: user.id })
  }

  if (!profile) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Profile not found');
  }
  if (!profile.email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email not found');
  }
  const passwordResetToken = jwtHelper.createResetToken({ id: user.id }, config.jwt.secret as string, "50m");

  const resetLlink: string = config.reset_link + `?token=${passwordResetToken}`;
  await sendEmail(profile.email, `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p style="color: #555;">Hi, ${profile.name.firstName},</p>
        <p style="color: #555;">We received a request to reset your password. You can reset it using the link below:</p>
        <p style="text-align: center;">
          <a href=${resetLlink} style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        </p>
        <p style="color: #555;">If you did not request a password reset, please ignore this email.</p>
        <p style="color: #555;">Thank you,</p>
        <p style="color: #555;">The Support Team</p>
      </div>
  `);

  // return {
  //   message:"Please Check your email."
  // };
}


const resetPassword = async (payload:{id:string,newPassword:string},token:string) => {
  console.log("Reset Password",payload,token);
  const {id,newPassword} = payload;
  const user = await User.findOne({id},{id:1})
 
   if(!user) {
     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
   }

   const isVerified = await jwtHelper.verifiedToken(token,config.jwt.secret as string);

   if(!isVerified){
    throw new ApiError(httpStatus.BAD_GATEWAY, 'Invalid token');
   }

   const password = await bcrypt.hash(newPassword,Number(config.bycrypt_salt_rounds));

    if(isVerified && password){
      await User.updateOne({id}, {password})
    }
   console.log("password: " , password)
}
export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword
};