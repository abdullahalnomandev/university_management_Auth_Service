import { z } from 'zod';
const updateAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z
      .object({
        name: z.object({
          firstName: z
            .string({
              required_error: 'First name is required',
            })
            .optional(),
          middleName: z.string().optional(),
          lastName: z
            .string({
              required_error: 'Last name is required',
            })
            .optional(),
        }),
        gender: z
          .string({
            required_error: 'Gender is required',
          })
          .optional(),
        dateOfBirth: z
          .string({
            required_error: 'Date of birth is required',
          })
          .optional(),
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
        managementDepartment: z
          .string({
            required_error: 'Management department id is required',
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

export const AdminValidation = {
  updateAdminZodSchema,
};
