'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FacultyValidation = void 0;
const zod_1 = require('zod');
const updateFacultyZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    password: zod_1.z.string().optional(),
    faculty: zod_1.z
      .object({
        name: zod_1.z.object({
          firstName: zod_1.z.string({
            required_error: 'First name is required',
          }),
          middleName: zod_1.z.string().optional(),
          lastName: zod_1.z.string({
            required_error: 'Last name is required',
          }),
        }),
        gender: zod_1.z.string({
          required_error: 'Gender is required',
        }),
        dateOfBirth: zod_1.z.string({
          required_error: 'Date of birth is required',
        }),
        email: zod_1.z
          .string({
            required_error: 'Email is required',
          })
          .email()
          .optional(),
        contactNo: zod_1.z
          .string({
            required_error: 'Contact number is required',
          })
          .optional(),
        emergencyContactNo: zod_1.z
          .string({
            required_error: 'Emergency contact number is required',
          })
          .optional(),
        bloodGroup: zod_1.z
          .string({
            required_error: 'Blood group is required',
          })
          .optional(),
        presentAddress: zod_1.z
          .string({
            required_error: 'Present address is required',
          })
          .optional(),
        permanentAddress: zod_1.z
          .string({
            required_error: 'Permanent address is required',
          })
          .optional(),
        academicDepartment: zod_1.z
          .string({
            required_error: 'Academic department is required',
          })
          .optional(),
        academicFaculty: zod_1.z
          .string({
            required_error: 'Academic faculty is required',
          })
          .optional(),
        designation: zod_1.z
          .string({
            required_error: 'Designation is required',
          })
          .optional(),
        profileImage: zod_1.z.string().optional(),
      })
      .optional(),
  }),
});
exports.FacultyValidation = {
  updateFacultyZodSchema,
};
