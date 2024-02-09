'use client'

import { z } from 'zod'
import { FormSchema, useForm } from '../form/useForm'
import MultiStepFormBuilder, { useMultiStepForm } from './MultiStepFormBuilder'

// Example usage:
// type FormDataType = z.infer<typeof FormDataSchema>
// const FormDataSchema = z.object({
//     email: z.string().min(1, 'Email is required').email('Invalid email address'),
//     first_name: z.string().min(1, 'First name is required'),
//     last_name: z.string().min(1, 'Last name is required'),
//     nickname: z.string().optional(),
//     // phone_numbers: z.array(z.object({ number: z.string() })).min(1, 'Phone number is required'),
//     username: z.string().min(1, 'Username is required'),
//     password: z.string().min(1, 'Password is required'),
// })

// const formSchema: FormSchema<FormDataType> = {
//     email: z.string().min(1, 'Email is required').email('Invalid email address'),
//     first_name: z.string().min(1, 'First name is required'),
//     last_name: z.string().min(1, 'Last name is required'),
//     nickname: z.string().optional(),
//     // phone_numbers: z.array(z.object({ number: z.string() })).min(1, 'Phone number is required'),
//     username: z.string().min(1, 'Username is required'),
//     password: z.string().min(1, 'Password is required'),
// }

type FormDataType = z.infer<typeof FormDataSchema>
const FormDataSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    nickname: z.string().optional(),
    phone_numbers: z.array(z.object({ number: z.string() })).min(1, 'Phone number is required'),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
})

function MyGenericWithWrapperFormComponent() {
    const initialData: FormDataType = {
        first_name: '',
        last_name: '',
        email: '',
        nickname: '',
        phone_numbers: [{ number: '' }],
        password: '',
        username: '',
    }
    
    const { data, updateFields, currentStepIndex, isLastStep, prev, next, steps } = useMultiStepForm(passedSteps, initialData, ()=>void)
    return <MultiStepFormBuilder initialData={initialData} steps={[PersonalInfo, AdditionalInfoStep, AccountStep, FinalStep]} />
}

export default MyGenericWithWrapperFormComponent
