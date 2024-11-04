import CustButton from '@/Components/CustButton';
import HeadLayout from '@/Components/HeadLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { router } from '@inertiajs/react';
import { ArrowCircleRight } from '@phosphor-icons/react';

export default function Beranda({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <HeadLayout title={'Beranda'} />

            <GuestLayout>
                <div className={'w-full h-dvh flex items-center justify-center'}>
                    <div className={'text-white md:max-w-[50%] text-center space-y-10 flex flex-col items-center justify-center'}>
                        <h1 className={'text-4xl font-semibold'}>Selamat Datang di SIPSPP</h1>
                        <p>SIPSPP (Sistem Pembayaran SPP) merupakan platform yang berfungsi sebagai media online untuk melakukan pembayaran tagihan PPDB dan SPP Yayasan Edelweiss Kota Cilegon.</p>
                        <p>Ayo segera bergabung bersama Sekolah Edelweiss dan gunakan platform SIPSPP sekarang juga!</p>
                        <CustButton icon={<ArrowCircleRight size={20} />} onClick={() => router.visit(route('login'), { method: 'get' })}>
                            Masuk SIPSPP
                        </CustButton>
                    </div>
                </div>
            </GuestLayout>
        </>
    );
}
