import { useState } from 'react'

export function useFieldArray<T>(initialData: T[]) {
    const [values, setValues] = useState<
        ({
            id: number
        } & T)[]
    >(() => {
        return initialData.map((item, index) => ({ id: index, ...item }))
    })

    const append = (value: T) => {
        setValues((prevValues) => [...prevValues, { ...value, id: values.length }])
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
