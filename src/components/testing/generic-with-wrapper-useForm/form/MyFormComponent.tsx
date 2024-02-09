'use client'

import { z } from 'zod'
import { FormSchema, useForm } from './useForm'

// Example usage:
type FormDataType = z.infer<typeof FormDataSchema>
const FormDataSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    nickname: z.string().optional(),
    // phone_numbers: z.array(z.object({ number: z.string() })).min(1, 'Phone number is required'),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
})

const formSchema: FormSchema<FormDataType> = {
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    nickname: z.string().optional(),
    // phone_numbers: z.array(z.object({ number: z.string() })).min(1, 'Phone number is required'),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
}

function MyGenericWithWrapperFormComponent() {
    const { formData, handleChange, handleSubmit, isValid } = useForm<FormDataType>(
        {
            first_name: '',
            last_name: '',
            email: '',
            nickname: '',
            // phone_numbers: [{ number: '' }],
            password: '',
            username: '',
        },
        formSchema,
    )

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First name:</label>
                <input type='text' value={formData.first_name.value} onChange={(e) => handleChange('first_name', e.target.value)} />
                {formData.first_name.error && <div className='text-sm text-red-600'>{formData.first_name.error}</div>}
            </div>
            <div>
                <label>Last name:</label>
                <input type='text' value={formData.last_name.value} onChange={(e) => handleChange('last_name', e.target.value)} />
                {formData.last_name.error && <div className='text-sm text-red-600'>{formData.last_name.error}</div>}
            </div>
            <div>
                <label>Email:</label>
                <input type='text' value={formData.email.value} onChange={(e) => handleChange('email', e.target.value)} />
                {formData.email.error && <div className='text-sm text-red-600'>{formData.email.error}</div>}
            </div>
            <div>
                <label>Nickname:</label>
                <input type='text' value={formData.nickname?.value} onChange={(e) => handleChange('nickname', e.target.value)} />
            </div>
            {/* <div>
                <label>phone_numbers:</label>
                <input type='text' value={formData.phone_numbers.value} onChange={(e) => handleChange('phone_numbers', e.target.value)} />
                {formData.phone_numbers.error && <div className='text-sm text-red-600'>{formData.phone_numbers.error}</div>}
            </div> */}
            <div>
                <label>Username:</label>
                <input type='text' value={formData.username.value} onChange={(e) => handleChange('username', e.target.value)} />
                {formData.username.error && <div className='text-sm text-red-600'>{formData.username.error}</div>}
            </div>
            <div>
                <label>Password:</label>
                <input type='text' value={formData.password.value} onChange={(e) => handleChange('password', e.target.value)} />
                {formData.password.error && <div className='text-sm text-red-600'>{formData.password.error}</div>}
            </div>
            <button type='submit'>Submit {isValid ? 'true' : 'false'}</button>
        </form>
    )
}

export default MyGenericWithWrapperFormComponent
