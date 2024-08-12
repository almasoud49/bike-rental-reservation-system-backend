import { z } from 'zod'

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is Required!' }),
    email: z.string({ required_error: 'Email is required!' }),
    password: z.string({ required_error: 'Password is Required!' }),
    phone: z.string({ required_error: 'Phone is Required!' }),
    address: z.string().optional(),
    role: z.enum(['admin', 'user'], {
      required_error: 'User role is Required!',
    }),
  }),
})

const updateUserProfileValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required!' }).optional(),
    phone: z.string({ required_error: 'Phone is required!' }).optional(),
    address: z.string().optional(),
  }),
})

export const UserValidations = {
  createUserValidationSchema,
  updateUserProfileValidationSchema,
}
