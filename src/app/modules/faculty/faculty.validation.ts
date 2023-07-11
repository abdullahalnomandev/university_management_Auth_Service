import { z } from 'zod';

const updateFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z
      .object({
        name: z.object({
          firstName: z.string({
            required_error: 'First name is required',
          }),
          middleName: z.string().optional(),
          lastName: z.string({
            required_error: 'Last name is required',
          }),
        }),
        gender: z.string({
          required_error: 'Gender is required',
        }),
        dateOfBirth: z.string({
          required_error: 'Date of birth is required',
        }),
        email: z
          .string({
            required_error: 'Email is required',
          })
          .email()
          .optional(),
        contactNo: z
          .string({
            required_error: 'Contact number is required',
          })
          .optional(),
        emergencyContactNo: z
          .string({
            required_error: 'Emergency contact number is required',
          })
          .optional(),
        bloodGroup: z
          .string({
            required_error: 'Blood group is required',
          })
          .optional(),
        presentAddress: z
          .string({
            required_error: 'Present address is required',
          })
          .optional(),
        permanentAddress: z
          .string({
            required_error: 'Permanent address is required',
          })
          .optional(),
        academicDepartment: z
          .string({
            required_error: 'Academic department is required',
          })
          .optional(),
        academicFaculty: z
          .string({
            required_error: 'Academic faculty is required',
          })
          .optional(),
        designation: z
          .string({
            required_error: 'Designation is required',
          })
          .optional(),
        profileImage: z.string().optional(),
      })
      .optional(),
  }),
});

export const FacultyValidation = {
  updateFacultyZodSchema,
};
