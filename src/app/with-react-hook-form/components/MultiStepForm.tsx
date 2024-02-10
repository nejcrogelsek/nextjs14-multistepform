'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormDataSchema } from './schema'

type Inputs = z.infer<typeof FormDataSchema>

const steps = [
    {
        id: 'Step 1',
        name: 'Start your business now',
        fields: ['first_name', 'last_name', 'email', 'nickname'],
    },
    {
        id: 'Step 2',
        name: 'Additional info',
        fields: ['phone_numbers'],
    },
    {
        id: 'Step 3',
        name: 'Almost done',
        fields: ['username', 'password'],
    },
    { id: 'Step 4', name: 'Complete' },
]

export default function MultiStepForm() {
    const [currentStep, setCurrentStep] = useState(0)

    const {
        register,
        handleSubmit,
        reset,
        trigger,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(FormDataSchema),
    })

    const { fields, append, remove } = useFieldArray({
        name: 'phone_numbers',
        control: control,
    })

    const processForm: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        reset()
    }

    type FieldName = keyof Inputs

    const next = async () => {
        const fields = steps[currentStep].fields
        const output = await trigger(fields as FieldName[], { shouldFocus: true })

        if (!output) return

        if (currentStep < steps.length - 1) {
            if (currentStep === steps.length - 2) {
                await handleSubmit(processForm)()
            }
            setCurrentStep((step) => step + 1)
        }
    }

    const prev = () => {
        if (currentStep > 0) {
            setCurrentStep((step) => step - 1)
        }
    }

    return (
        <section className='relative inset-0 flex flex-col justify-between p-24'>
            {/* steps */}
            <nav aria-label='Progress'>
                <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
                    {steps.map((step, index) => (
                        <li key={step.name} className='md:flex-1'>
                            {currentStep > index ? (
                                <div className='group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                    <span className='text-sm font-medium text-sky-600 transition-colors '>{step.id}</span>
                                    <span className='text-sm font-medium'>{step.name}</span>
                                </div>
                            ) : currentStep === index ? (
                                <div className='flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4' aria-current='step'>
                                    <span className='text-sm font-medium text-sky-600'>{step.id}</span>
                                    <span className='text-sm font-medium'>{step.name}</span>
                                </div>
                            ) : (
                                <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                    <span className='text-sm font-medium text-gray-500 transition-colors'>{step.id}</span>
                                    <span className='text-sm font-medium'>{step.name}</span>
                                </div>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>

            {/* Form */}
            <form className='mt-12 py-12' onSubmit={handleSubmit(processForm)}>
                {currentStep === 0 && (
                    <div>
                        <h2 className='text-base font-semibold leading-7 text-gray-900'>Personal Information</h2>
                        <p className='mt-1 text-sm leading-6 text-gray-600'>Provide your personal details.</p>
                        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                            <div className='sm:col-span-3'>
                                <label htmlFor='first_name' className='block text-sm font-medium leading-6 text-gray-900'>
                                    First name
                                </label>
                                <div className='mt-2'>
                                    <input
                                        type='text'
                                        id='first_name'
                                        {...register('first_name')}
                                        autoComplete='given-name'
                                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                    />
                                    {errors.first_name?.message && <p className='mt-2 text-sm text-red-400'>{errors.first_name.message}</p>}
                                </div>
                            </div>

                            <div className='sm:col-span-3'>
                                <label htmlFor='last_name' className='block text-sm font-medium leading-6 text-gray-900'>
                                    Last name
                                </label>
                                <div className='mt-2'>
                                    <input
                                        type='text'
                                        id='last_name'
                                        {...register('last_name')}
                                        autoComplete='family-name'
                                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                    />
                                    {errors.last_name?.message && <p className='mt-2 text-sm text-red-400'>{errors.last_name.message}</p>}
                                </div>
                            </div>

                            <div className='sm:col-span-4'>
                                <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                                    Email address
                                </label>
                                <div className='mt-2'>
                                    <input
                                        id='email'
                                        type='email'
                                        {...register('email')}
                                        autoComplete='email'
                                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                    />
                                    {errors.email?.message && <p className='mt-2 text-sm text-red-400'>{errors.email.message}</p>}
                                </div>
                            </div>

                            <div className='sm:col-span-2'>
                                <label htmlFor='nickname' className='block text-sm font-medium leading-6 text-gray-900'>
                                    Nickname
                                </label>
                                <div className='mt-2'>
                                    <input
                                        id='nickname'
                                        type='text'
                                        {...register('nickname')}
                                        autoComplete='nickname'
                                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                    />
                                    {errors.nickname?.message && <p className='mt-2 text-sm text-red-400'>{errors.nickname.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 1 && (
                    <div>
                        <h2 className='text-base font-semibold leading-7 text-gray-900'>Phone number</h2>
                        <p className='mt-1 text-sm leading-6 text-gray-600'>Provide all the phone numbers we can call you on.</p>

                        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                            <div className='sm:col-span-6'>
                                <label htmlFor='phone_numbers' className='block text-sm font-medium leading-6 text-gray-900'>
                                    Phone numbers
                                </label>
                                <div className='mt-2'>
                                    {fields.map((field, index) => (
                                        <div key={field.id} className='flex items-center justify-center'>
                                            <input
                                                id='phone_numbers'
                                                type='text'
                                                {...register(`phone_numbers.${index}.number`)}
                                                autoComplete='phone_numbers'
                                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
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
                                    {errors.phone_numbers?.message && <p className='mt-2 text-sm text-red-400'>{errors.phone_numbers.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {currentStep === 2 && (
                    <div>
                        <h2 className='text-base font-semibold leading-7 text-gray-900'>Sign in credentials</h2>
                        <p className='mt-1 text-sm leading-6 text-gray-600'>Provide your sign in credentials.</p>

                        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                            <div className='sm:col-span-3'>
                                <label htmlFor='username' className='block text-sm font-medium leading-6 text-gray-900'>
                                    Username
                                </label>
                                <div className='mt-2'>
                                    <input
                                        id='username'
                                        type='text'
                                        {...register('username')}
                                        autoComplete='username'
                                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                    />
                                    {errors.username?.message && <p className='mt-2 text-sm text-red-400'>{errors.username.message}</p>}
                                </div>
                            </div>
                            <div className='sm:col-span-3'>
                                <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
                                    Password
                                </label>
                                <div className='mt-2'>
                                    <input
                                        id='password'
                                        type='password'
                                        {...register('password')}
                                        autoComplete='password'
                                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                    />
                                    {errors.password?.message && <p className='mt-2 text-sm text-red-400'>{errors.password.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <>
                        <h2 className='text-base font-semibold leading-7 text-gray-900'>Complete</h2>
                        <p className='mt-1 text-sm leading-6 text-gray-600'>Thank you for your submission.</p>
                        <button className='btn mt-2' onClick={() => setCurrentStep(0)}>
                            Try again
                        </button>
                    </>
                )}
            </form>

            {/* Navigation */}
            <div className='mt-8 pt-5'>
                <div className='flex justify-between'>
                    {currentStep !== steps.length - 1 && (
                        <button
                            type='button'
                            onClick={prev}
                            disabled={currentStep === 0}
                            className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'>
                            PREVIOUS
                        </button>
                    )}
                    <button
                        type='button'
                        onClick={next}
                        disabled={currentStep === steps.length - 1}
                        className='ml-auto rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'>
                        NEXT
                    </button>
                </div>
            </div>
        </section>
    )
}
