import { z } from 'zod'

export const FormDataSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    nickname: z.string().optional(),
    phone_numbers: z.array(z.object({ number: z.string() })).min(1, 'Phone number is required'),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
})
