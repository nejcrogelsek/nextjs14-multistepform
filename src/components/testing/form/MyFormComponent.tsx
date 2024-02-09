'use client'

import { z } from 'zod'
import { FormSchema, useForm } from './useForm'

// Example usage:
type User = {
    username: string
    age: number
}

const userSchema: FormSchema<User> = {
    username: z.string().min(3),
    age: z.number().min(18),
}

function MyFormComponent() {
    const { formData, handleChange, handleSubmit, isValid } = useForm<User>({ username: '', age: 0 }, userSchema)

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type='text' value={formData.username.value} onChange={(e) => handleChange('username', e.target.value)} />
                {formData.username.error && <div className='text-sm text-red-600'>{formData.username.error}</div>}
            </div>
            <div>
                <label>Age:</label>
                <input type='number' value={formData.age.value} onChange={(e) => handleChange('age', parseInt(e.target.value))} />
                {formData.age.error && <div className='text-sm text-red-600'>{formData.age.error}</div>}
            </div>
            <button type='submit'>Submit {isValid ? 'true' : 'false'}</button>
        </form>
    )
}

export default MyFormComponent
