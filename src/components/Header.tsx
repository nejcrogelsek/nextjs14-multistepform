import Link from 'next/link'

const Header = () => {
    return (
        <ul className='mb-8 flex items-center justify-center'>
            <li>
                <Link href='/'>HOME</Link>
            </li>
            <li>
                <Link href='/with-react-hook-form'>With React Hook Form</Link>
            </li>
        </ul>
    )
}

export default Header
