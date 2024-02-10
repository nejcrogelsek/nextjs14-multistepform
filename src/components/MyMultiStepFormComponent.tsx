'use client'

import { FormEvent } from 'react'
import { z } from 'zod'

import { useFieldArray } from './form/useFieldArray'
import { FormSchema, useForm, useFormSteps } from './form/useForm'

type User = {
    first_name: string
    last_name: string
    email: string
    nickname?: string
    phone_numbers: { number: string }[]
    username: string
    password: string
}

const userSchema: FormSchema<User> = {
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    nickname: z.string().optional(),
    phone_numbers: z.array(z.object({ number: z.string().min(1, 'Phone number is required') })).min(1, 'Phone number is required'),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
}

function MyMultiStepFormComponent() {
    const { formData, handleChange, validate, setError } = useForm<User>(
        {
            first_name: '',
            last_name: '',
            email: '',
            nickname: '',
            phone_numbers: [{ number: '' }],
            password: '',
            username: '',
        },
        userSchema,
    )

    const { currentStepIndex, steps, next, prev, isLastStep } = useFormSteps(
        [['first_name', 'last_name', 'email', 'nickname'], ['phone_numbers'], ['username', 'password']],
        userSchema,
        setError,
        formData,
    )
    const { append, remove, values } = useFieldArray([{ number: '' }])

    function onSubmit(event: FormEvent) {
        event.preventDefault()
        if (!isLastStep) {
            next()
            return
        }
        const data = validate()
        if (!data) {
            return
        }
        console.log(data)
    }

    return (
        <>
            {/* Steps */}
            <div>
                {currentStepIndex + 1} / {steps.length + 1}
            </div>

            {/* Form */}
            <form onSubmit={onSubmit}>
                {/* 1. Step */}
                {currentStepIndex === 0 && (
                    <>
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
                    </>
                )}
                {/* 2. Step */}
                {currentStepIndex === 1 && (
                    <>
                        <div>
                            <label>Phone numbers:</label>
                            {values.map((field, index) => (
                                <div key={index} className='flex items-center justify-start'>
                                    <input
                                        type='text'
                                        id={`phone_number_${field.id}`}
                                        name={`phone_number_${field.id}`}
                                        value={field.number}
                                        onChange={(e) => {
                                            const newValues = [...values]
                                            newValues.at(index)!.number = e.target.value
                                            handleChange('phone_numbers', newValues)
                                        }}
                                    />
                                    {index > 0 && (
                                        <button type='button' className='btn' onClick={() => remove(index)}>
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button type='button' className='btn' onClick={() => append({ number: '' })}>
                                Add phone number
                            </button>
                            {formData.phone_numbers.error && <div className='text-sm text-red-600'>{formData.phone_numbers.error}</div>}
                        </div>
                    </>
                )}
                {/* 3. Step */}
                {currentStepIndex === 2 && (
                    <>
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
                    </>
                )}
                {/* 4. Step */}
                {currentStepIndex === 3 && (
                    <>
                        <h1>THANK YOU</h1>
                    </>
                )}

                {/* Navigation */}
                <div>
                    <button type='button' onClick={prev}>
                        Previous
                    </button>
                    <button type='submit'>Next</button>
                </div>
            </form>
        </>
    )
}

export default MyMultiStepFormComponent
