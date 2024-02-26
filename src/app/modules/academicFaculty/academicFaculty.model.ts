import { Schema, model } from 'mongoose';
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
    },
    syncId: {
      type: String,
      required: false,
      unique: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema
);
