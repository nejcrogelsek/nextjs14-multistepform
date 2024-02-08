'use client'

import { AccountForm } from './AccountForm'
import { AddressForm } from './AddressForm'
import MultiStepForm from './shared/MultiStepFormBuilder'
import { UserForm } from './UserForm'

const StartYourCompanyForm = () => {
    return (
        <MultiStepForm
            initialData={{
                firstName: '',
                lastName: '',
                email: '',
                username: '',
                password: '',
            }}
            steps={[UserForm, AddressForm, AccountForm]}
        />
    )
}

export default StartYourCompanyForm
