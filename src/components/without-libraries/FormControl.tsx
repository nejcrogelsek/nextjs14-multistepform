import { ReactNode } from 'react'

type FormControlProps = {
    children: ReactNode
    className?: string
}

export const FormControl = ({ children, className }: FormControlProps) => {
    return <div className={className}>{children}</div>
}
