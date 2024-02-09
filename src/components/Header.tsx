import Link from 'next/link'

const Header = () => {
    return (
        <ul className='mb-8 flex items-center justify-center'>
            <li className='font-bold mr-8'>
                <Link href='/'>HOME</Link>
            </li>
            <li className='font-bold mr-8'>
                <Link href='/form'>Form</Link>
            </li>
            <li className='font-bold'>
                <Link href='/with-react-hook-form'>React Hook Form</Link>
            </li>
        </ul>
    )
}

export default Header
