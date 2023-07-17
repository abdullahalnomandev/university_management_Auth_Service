'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicDepartmentValidation = void 0;
const zod_1 = require('zod');
const createAcademicDepartmentZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string({
      required_error: 'title is required',
      invalid_type_error: 'title must be a string',
    }),
  }),
});
const updateAcademicDepartmentZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string({
      required_error: 'title is required',
      invalid_type_error: 'title must be a string',
    }),
    academicFaculty: zod_1.z.string({
      required_error: 'academicFaculty id is required',
      invalid_type_error: 'academicFaculty id must be a string',
    }),
  }),
});
exports.AcademicDepartmentValidation = {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
};
