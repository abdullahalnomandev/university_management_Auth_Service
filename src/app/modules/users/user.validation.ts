import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.constant';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First Name is required',
        }),
        middleName: z
          .string({
            required_error: 'First Name is required',
          })
          .optional(),
        lastName: z
          .string({
            required_error: 'First Name is required',
          })
          .optional(),
      }),
      dateObBirth: z.string({
        required_error: 'Date of Birth is required',
      }),
      gender: z.enum([...gender] as [string,...string[]], {
        required_error: 'Gender is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string,...string[]], {
        required_error: 'Blood Group is required',
      }).optional(),
      dateOfBirth:z.string({
        required_error: 'Date of Birth is required'
      }),
      email:z.string({
        required_error: 'Email is required'
      }).email(),
      emaergencyContactNo:z.string({
        required_error: 'Emergency Contact is required'
      }),
      presentAddress:z.string({
        required_error: 'Address  is required'
      }),
      permanentAddress:z.string({
        required_error: 'Address  is required'
      })
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
