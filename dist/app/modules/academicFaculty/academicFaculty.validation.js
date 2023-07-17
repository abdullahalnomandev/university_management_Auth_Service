'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicFacultyValidation = void 0;
const zod_1 = require('zod');
const createAcademicFacultyUserZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string({
      required_error: 'title is required',
      invalid_type_error: 'title must be a string',
    }),
  }),
});
const updateAcademicFacultyUserZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string({
      required_error: 'title is required',
      invalid_type_error: 'title must be a string',
    }),
  }),
});
exports.AcademicFacultyValidation = {
  createAcademicFacultyUserZodSchema,
  updateAcademicFacultyUserZodSchema,
};
