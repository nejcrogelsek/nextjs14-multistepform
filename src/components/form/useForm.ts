'use client'

import { useEffect, useState } from 'react'
import { z, ZodError } from 'zod'

// Generic type for the form data
export type FormData<T> = {
    [K in keyof T]: {
        value: T[K]
        error?: string
    }
} & {
    [key: string]: {
        value: unknown
        error?: string
    }
}

// Generic type for the form schema
export type FormSchema<T> = {
    [K in keyof T]: z.ZodType<T[K]>
}

// Generic function for creating a form builder
export function useForm<T>(initialData: T, schema: FormSchema<T>) {
    const [isValid, setIsValid] = useState(false)
    const [formData, setFormData] = useState<FormData<T>>(() => {
        const initialState: FormData<T> = {} as FormData<T>
        for (const key in initialData) {
            initialState[key] = { value: initialData[key] } as FormData<T>[Extract<keyof T, string>]
        }
        return initialState
    })

    const setError = <K extends keyof T>(key: K, errorMessage: string) => {
        setFormData((prevState) => ({
            ...prevState,
            [key]: { ...prevState[key], error: errorMessage },
        }))
    }

    const handleChange = <K extends keyof T>(key: K, value: T[K]) => {
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

    const validate = () => {
        const parsedData = {} as T
        for (const key in schema) {
            try {
                parsedData[key] = schema[key].parse(formData[key].value)
            } catch (error) {
                if (error instanceof ZodError) {
                    error.errors.forEach((err) => {
                        if (key && key in formData) {
                            setError(key, err.message)
                        }
                    })
                }
            }
        }
        if (isValid) {
            return parsedData
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
    }, [formData, schema])

    return {
        formData,
        handleChange,
        validate,
        isValid,
        setError,
    }
}

// Generic function for creating a form steps e.g. multi step form
export function useFormSteps<T, K extends keyof T>(steps: K[][], schema: FormSchema<T>, setError: (key: K, errorMessage: string) => void, formData: FormData<T>) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0)

    function validateStep(): boolean {
        let stepHasErrors = false
        const fields = steps[currentStepIndex]
        for (let index = 0; index < fields.length; index++) {
            const key = steps[currentStepIndex][index]
            try {
                schema[key].parse(formData[key].value)
            } catch (error) {
                if (error instanceof ZodError) {
                    error.errors.forEach((err) => {
                        if (key && key in formData) {
                            stepHasErrors = true
                            setError(key, err.message)
                        }
                    })
                }
            }
        }
        return stepHasErrors ? false : true
    }

    function next(skipValidation?: boolean) {
        const isStepValid = skipValidation ? true : validateStep()
        if (!isStepValid) {
            return
        }
        setCurrentStepIndex((i) => {
            if (i >= steps.length - 1) return i
            return i + 1
        })
    }

    function prev() {
        setCurrentStepIndex((i) => {
            if (i <= 0) return i
            return i - 1
        })
    }

    function goTo(stepIndex: number) {
        setCurrentStepIndex(stepIndex)
    }

    return {
        currentStepIndex,
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        next,
        prev,
        goTo,
    }
}
