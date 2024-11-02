import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Hero1 from '@/Assets/img/hero1.jpg';

export default function GuestLayout({ children }) {
    return (
        <>
            <div className={'w-full h-dvh overflow-hidden relative flex items-center justify-center'}>
                <img src={Hero1} className={'w-full absolute top-0 left-0 brightness-[.3] -z-10'} />
                <div className={'w-full h-[13%] absolute z-20 left-0 top-0 bg-white px-5 md:px-20 py-5 flex justify-between items-center'}>
                    <div className={'flex items-center gap-2'}>
                        <ApplicationLogo />
                        <p className={'text-2xl font-semibold'}>SIPESED</p>
                    </div>
                    <div className={'space-x-10'}>
                        <Link href={route('beranda')} className={'hover:text-blue-500'}>Beranda</Link>
                        <Link href={route('login')} className={'hover:text-blue-500'}>Login</Link>
                        <Link href={route('register')} className={'hover:text-blue-500'}>Daftar</Link>
                    </div>
                </div>
                <div className={'flex z-10'}>
                    {children}
                </div>
            </div>
        </>
    );
}
