import { z } from 'zod';
const createAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
      invalid_type_error: 'title must be a string',
    }),
    // academicFaculty: z.string({
    //   required_error: 'academicFaculty id is required',
    //   invalid_type_error: 'academicFaculty id must be a string',
    // }),
  }),
});
const updateAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
      invalid_type_error: 'title must be a string',
    }),
    academicFaculty: z.string({
      required_error: 'academicFaculty id is required',
      invalid_type_error: 'academicFaculty id must be a string',
    }),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
};
