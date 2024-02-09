import { FormControl } from './FormControl'

type UserFormProps = {
    firstName: string
    lastName: string
    updateFields: (fields: Partial<UserFormProps>) => void
}

export const AddressForm = ({ firstName, lastName, updateFields }: UserFormProps) => {
    return (
        <>
            <h2>Add your information</h2>
            <FormControl>
                <input type='text' name='firstname' value={firstName} placeholder='Enter first name' required autoFocus onChange={(e) => updateFields({ firstName: e.target.value })} />
                <input type='text' name='lastname' value={lastName} placeholder='Enter last name' required onChange={(e) => updateFields({ lastName: e.target.value })} />
            </FormControl>
        </>
    )
}
