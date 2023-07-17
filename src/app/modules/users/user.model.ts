/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';

import bcrypt from 'bcrypt';
import config from '../../../config';
import { IUser, UserModel } from './user.interface';
const { ObjectId } = Schema.Types;

const userSchema = new Schema<IUser>(
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

// Hashing password
userSchema.pre('save', async function(next) {
  const user = this;
  user.password = await bcrypt.hashSync(user.password, Number(config.bycrypt_salt_rounds));
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
