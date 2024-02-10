import Link from 'next/link'

const Header = () => {
    return (
        <ul className='mb-8 flex items-center justify-center'>
            <li className='mr-8 font-bold'>
                <Link href='/'>FORM</Link>
            </li>
            <li className='mr-8 font-bold'>
                <Link href='/form'>MULTI STEP FORM</Link>
            </li>
            <li className='font-bold'>
                <Link href='/with-react-hook-form'>React Hook Form</Link>
            </li>
        </ul>
    )
}

export default Header
