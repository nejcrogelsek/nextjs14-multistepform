import { useState } from 'react'

export function useFieldArray<T extends Record<string, unknown>>() {
    const [values, setValues] = useState<T[]>([])

    const append = (value: T) => {
        setValues((prevValues) => [...prevValues, value])
    }

    const remove = (index: number) => {
        setValues((prevValues) => prevValues.filter((_, i) => i !== index))
    }

    return {
        values,
        append,
        remove,
    }
}
