import Image from 'next/image';
import logo from '@/src/assets/images/asifulmamun-logo.png';

export default function Header() {
    return (
        <header>
            <nav>
                <Image
                    src={logo}
                    alt="Asiful Mamun"
                />
            </nav>
        </header>
    );
}