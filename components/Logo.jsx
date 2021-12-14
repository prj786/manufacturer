import Link from 'next/link';
import Image from 'next/image';
import mainImage from '../public/images/logo.png';

export default function Logo() {
    return (
        <div style={{width: '150px', height: '55px', marginTop: '25px', cursor: 'pointer'}}>
            <Link href='/'>
                <Image
                    src={mainImage}
                    alt="Picture of the author"
                    placeholder='blur'
                    layout='responsive'
                />
            </Link>
        </div>
    )
}