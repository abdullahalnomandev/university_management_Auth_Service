// //   designation: string;

import { Schema, model } from 'mongoose';
import { bloodGroup, gender } from './faculty.constant';
import { FacultyModel, IFaculty } from './faculty.interface';

const { ObjectId } = Schema.Types;
export const facultySchema = new Schema<IFaculty, FacultyModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
        },
        middleName: {
          type: String,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
      enum: gender,
    },
    bloodGroup: {
      type: String,
      enum: bloodGroup,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      unique: true,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      // required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    academicDepartment: {
      type: ObjectId,
      ref: 'AcademicDepartment',
    },
    academicFaculty: {
      type: ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Faculty = model<IFaculty, FacultyModel>('Faculty', facultySchema);
