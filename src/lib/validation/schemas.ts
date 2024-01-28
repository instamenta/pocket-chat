import { z } from 'zod';

export const sign_in_schema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(32, 'Username must be at most 32 characters')
    .refine(
      (value) =>
        /^(?![-_.])[a-zA-Z0-9]+(?:[-_.][a-zA-Z0-9]+)*$(?<![-_.])/.test(value),
      {
        message: 'Invalid characters in username',
      },
    ),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const sign_up_schema = z.object({
  firstName: z
    .string()
    .min(3, 'First name must be between 3 and 32 characters')
    .max(32, 'First name must be between 3 and 32 characters')
    .refine(
      (value) =>
        /^(?![-_.])[a-zA-Z0-9]+(?:[-_.][a-zA-Z0-9]+)*$(?<![-_.])/.test(value),
      {
        message: 'Invalid characters in firstName',
      },
    ),
  lastName: z
    .string()
    .min(3, 'Last name must be between 3 and 32 characters')
    .max(32, 'Last name must be between 3 and 32 characters')
    .refine(
      (value) =>
        /^(?![-_.])[a-zA-Z0-9]+(?:[-_.][a-zA-Z0-9]+)*$(?<![-_.])/.test(value),
      {
        message: 'Invalid characters in lastName',
      },
    ),
  username: z
    .string()
    .min(3, 'Username must be between 3 and 32 characters')
    .max(32, 'Username must be between 3 and 32 characters')
    .refine(
      (value) =>
        /^(?![-_.])[a-zA-Z0-9]+(?:[-_.][a-zA-Z0-9]+)*$(?<![-_.])/.test(value),
      {
        message: 'Invalid characters in username',
      },
    ),

  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
});
