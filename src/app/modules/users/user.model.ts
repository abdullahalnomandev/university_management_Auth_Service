import { Schema, model } from 'mongoose';

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
    // faculty:{
    //   type:ObjectId,
    //   ref:'Faculty'
    // },
    // admin:{
    //   type:ObjectId,
    //   ref:'Admin'
    // },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
export const User = model<IUser, UserModel>('User', userSchema);
