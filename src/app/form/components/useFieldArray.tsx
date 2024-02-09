import { useState } from 'react'

export function useFieldArray<T extends { id: number }>(initialData: T[]) {
    const [values, setValues] = useState<T[]>(initialData)

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
