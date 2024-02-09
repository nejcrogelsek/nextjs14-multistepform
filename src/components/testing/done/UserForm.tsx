import { FormControl } from './FormControl'

type UserFormProps = {
    email: string
    updateFields: (fields: Partial<UserFormProps>) => void
}

export const UserForm = ({ email, updateFields }: UserFormProps) => {
    return (
        <>
            <h2>Start your business now</h2>
            <FormControl>
                <input type='email' name='email' id='email' placeholder='Email' value={email} required autoFocus onChange={(e) => updateFields({ email: e.target.value })} />
                <button>Get Started</button>
            </FormControl>
        </>
    )
}
