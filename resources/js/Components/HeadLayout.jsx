import { Head } from '@inertiajs/react';
import Logo from '@/Assets/img/logo.png';

export default function HeadLayout({ title }) {
    return (
        <Head title={title}>
            <link rel="shortcut icon" href={Logo} type="image/x-icon" />
        </Head>
    );
}