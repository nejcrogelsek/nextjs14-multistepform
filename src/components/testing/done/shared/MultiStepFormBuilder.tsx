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

    const { steps, currentStepIndex, step, isLastStep, prev, next } = useMultiStepForm(passedSteps, data, updateFields)

    function onSubmit(e: FormEvent) {
        e.preventDefault()
        next()
        if (isLastStep) {
            alert(JSON.stringify(data))
        }
    }

    return (
        <>
            <section className='relative inset-0 flex flex-col justify-between p-24'>
                {/* steps */}
                <nav aria-label='Progress'>
                    <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
                        {steps.map((step, index) => (
                            <li key={step.name} className='md:flex-1'>
                                {currentStepIndex > index ? (
                                    <div className='group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                        <span className='text-sm font-medium text-sky-600 transition-colors '>{step.id}</span>
                                        <span className='text-sm font-medium'>{step.name}</span>
                                    </div>
                                ) : currentStepIndex === index ? (
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

                <form onSubmit={onSubmit}>{step}</form>

                {/* Navigation */}
                <div className='mt-8 pt-5'>
                    <div className='flex justify-between'>
                        {currentStepIndex !== steps.length - 1 && (
                            <button
                                type='button'
                                onClick={prev}
                                disabled={currentStepIndex === 0}
                                className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'>
                                PREVIOUS
                            </button>
                        )}
                        <button
                            type='button'
                            onClick={next}
                            disabled={currentStepIndex === steps.length - 1}
                            className='ml-auto rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'>
                            NEXT
                        </button>
                    </div>
                </div>
            </section>
        </>
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

    function prev() {
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
        prev,
    }
}
