'use client'

import { FormEvent, useState } from 'react'

interface MultiStepFormProps<T> {
    steps: any[]
    initialData: T
}

function MultiStepForm<T>({ steps: passedSteps, initialData }: MultiStepFormProps<T>) {
    const [data, setData] = useState(initialData)

    function updateFields(fields: Partial<T>) {
        setData((prev) => {
            return { ...prev, ...fields }
        })
    }

    const { steps, currentStepIndex, step, isLastStep, isFirstStep, back, next } = useMultiStepForm(passedSteps, data, updateFields)

    function onSubmit(e: FormEvent) {
        e.preventDefault()
        next()
        if (isLastStep) {
            alert(JSON.stringify(data))
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                {currentStepIndex + 1} / {steps.length}
            </div>
            {step}
            <div className='flex items-center justify-center'>
                {!isFirstStep && (
                    <button type='button' className='btn mr-4' onClick={back}>
                        Previous step
                    </button>
                )}
                {isFirstStep ? (
                    ''
                ) : (
                    <button type='submit' className='btn'>
                        Next
                    </button>
                )}
            </div>
        </form>
    )
}

export default MultiStepForm

function useMultiStepForm<T>(steps: any[], data: T, updateFields: (fields: Partial<T>) => void) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0)

    function next() {
        setCurrentStepIndex((i) => {
            if (i >= steps.length - 1) return i
            return i + 1
        })
    }

    function back() {
        setCurrentStepIndex((i) => {
            if (i <= 0) return i
            return i - 1
        })
    }

    function goTo(index: number) {
        setCurrentStepIndex(index)
    }

    const StepComponent = steps[currentStepIndex]

    return {
        currentStepIndex,
        step: <StepComponent {...data} updateFields={updateFields} />,
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        goTo,
        next,
        back,
    }
}
