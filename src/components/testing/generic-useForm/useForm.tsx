'use client'

import { FormEventHandler, HTMLAttributes, InputHTMLAttributes, useEffect, useState } from 'react'
import { z, ZodError } from 'zod'

// Define a generic type for the form data
type FormData<Schema> = {
    [K in keyof Schema]: {
        value: Schema[K]
        error?: string
    }
} & {
    [key: string]: {
        value: unknown
        error?: string
    }
}

// Define a generic type for the form schema
export type FormSchema<Schema> = {
    [K in keyof Schema]: z.ZodType<Schema[K]>
}

type InitialData = { [key: string]: InputHTMLAttributes<HTMLInputElement> }

// Define a generic function for creating a form builder
export function useForm<Schema, TData = InitialData>(initialData: TData, schema: FormSchema<Schema>) {
    console.log(initialData)
    const [isValid, setIsValid] = useState(false)
    const [formData, setFormData] = useState<FormData<Schema>>(() => {
        const initialState: FormData<Schema> = {} as FormData<Schema>
        for (const key in initialData) {
            initialState[key] = { value: initialData[key] } as any
        }
        return initialState
    })

    const handleChange = <K extends keyof Schema>(key: K, value: Schema[K]) => {
        try {
            schema[key].parse(value)
            setFormData((prevState) => ({
                ...prevState,
                [key]: { value },
            }))
        } catch (error) {
            setFormData((prevState) => ({
                ...prevState,
                [key]: { value, error: prevState[key].error },
            }))
        }
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()
        const parsedData = {} as Schema
        for (const key in schema) {
            try {
                parsedData[key] = schema[key].parse(formData[key].value)
            } catch (error) {
                if (error instanceof ZodError) {
                    error.errors.forEach((err) => {
                        if (key && key in formData) {
                            setFormData((prevState) => ({
                                ...prevState,
                                [key]: { ...prevState[key], error: err.message },
                            }))
                        }
                    })
                }
            }
        }
        if (isValid) {
            console.log('Parsed data:', parsedData)
        }
    }

    /* Handle isValid */
    useEffect(() => {
        try {
            for (const key in schema) {
                schema[key].parse(formData[key].value)
            }
            setIsValid(true)
        } catch (error) {
            setIsValid(false)
        }
    }, [formData])

    return {
        formData,
        handleChange,
        handleSubmit,
        isValid,
    }
}
