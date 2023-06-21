import { z } from 'zod';
const createAcademicFacultyUserZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
      invalid_type_error: 'title must be a string',
    }),
  }),
});

const updateAcademicFacultyUserZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
      invalid_type_error: 'title must be a string',
    }),
  }),
});

export const AcademicFacultyValidation = {
  createAcademicFacultyUserZodSchema,
  updateAcademicFacultyUserZodSchema,
};
