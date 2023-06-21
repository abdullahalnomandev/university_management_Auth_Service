import { Schema, model } from 'mongoose';
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface';

const academicFacultySchema = new Schema<IAcademicFaculty>({
  title: { type: String, required: true },
});

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'academicFaculty',
  academicFacultySchema
);
