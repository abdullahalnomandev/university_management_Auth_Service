/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';

import bcrypt from 'bcrypt';
import config from '../../../config';
import { IUser, IUserMethods, UserModel } from './user.interface';
const { ObjectId } = Schema.Types;

const userSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    student: {
      type: ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.methods.isUserExist = async function (
  id: string
): Promise<Pick<IUser, 'id' | 'password' | 'needsPasswordChange'> | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1 }
  ).lean();
};

userSchema.methods.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compareSync(givenPassword, savedPassword);
};

// Hashing password
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hashSync(
    user.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
