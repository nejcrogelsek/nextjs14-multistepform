'use client'

import MultiStepForm from './shared/MultiStepFormBuilder'

import z from 'zod'

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

const StartYourCompanyForm = () => {
    const initialData: FormDataType = {
        first_name: '',
        last_name: '',
        email: '',
        nickname: '',
        phone_numbers: [{ number: '' }],
        password: '',
        username: '',
    }
    return <MultiStepForm initialData={initialData} steps={[PersonalInfo, AdditionalInfoStep, AccountStep, FinalStep]} />
}

export default StartYourCompanyForm

type AccountStepProps = {
    fields: {
        username: string
        password: string
    }
    updateFields: (fields: Partial<AccountStepProps['fields']>) => void
}

const AccountStep = ({ fields, updateFields }: AccountStepProps) => {
    const { password, username } = fields
    return (
        <>
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
                                type='text'
                                name='username'
                                id='username'
                                value={username}
                                required
                                onChange={(e) => updateFields({ username: e.target.value })}
                                autoComplete='username'
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>
                    <div className='sm:col-span-3'>
                        <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
                            Password
                        </label>
                        <div className='mt-2'>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                value={password}
                                required
                                onChange={(e) => updateFields({ password: e.target.value })}
                                autoComplete='password'
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

type AdditionalInfoStepProps = {
    fields: {
        phoneNumbers: string[]
    }
    updateFields: (fields: Partial<AdditionalInfoStepProps['fields']>) => void
}

const AdditionalInfoStep = ({ fields, updateFields }: AdditionalInfoStepProps) => {
    return (
        <>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

type PersonalInfoProps = {
    fields: {
        email: string
        first_name: string
        last_name: string
        nickname: string
    }
    updateFields: (fields: Partial<PersonalInfoProps['fields']>) => void
}

const PersonalInfo = ({ fields, updateFields }: PersonalInfoProps) => {
    const { email, first_name, last_name, nickname } = fields
    return (
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
                            name='first_name'
                            id='first_name'
                            value={first_name}
                            required
                            autoFocus
                            onChange={(e) => updateFields({ first_name: e.target.value })}
                            autoComplete='given-name'
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                        />
                    </div>
                </div>

                <div className='sm:col-span-3'>
                    <label htmlFor='last_name' className='block text-sm font-medium leading-6 text-gray-900'>
                        Last name
                    </label>
                    <div className='mt-2'>
                        <input
                            type='text'
                            name='last_name'
                            id='last_name'
                            value={last_name}
                            required
                            autoFocus
                            onChange={(e) => updateFields({ last_name: e.target.value })}
                            autoComplete='family-name'
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                        />
                    </div>
                </div>

                <div className='sm:col-span-4'>
                    <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                        Email address
                    </label>
                    <div className='mt-2'>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            value={email}
                            required
                            autoFocus
                            autoComplete='email'
                            onChange={(e) => updateFields({ email: e.target.value })}
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                        />
                    </div>
                </div>

                <div className='sm:col-span-2'>
                    <label htmlFor='nickname' className='block text-sm font-medium leading-6 text-gray-900'>
                        Nickname
                    </label>
                    <div className='mt-2'>
                        <input
                            type='text'
                            name='nickname'
                            id='nickname'
                            value={nickname}
                            required
                            autoFocus
                            autoComplete='nickname'
                            onChange={(e) => updateFields({ nickname: e.target.value })}
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const FinalStep = () => {
    return (
        <>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>Complete</h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>Thank you for your submission.</p>
            <button className='btn mt-2' onClick={() => setCurrentStep(0)}>
                Try again
            </button>
        </>
    )
}
