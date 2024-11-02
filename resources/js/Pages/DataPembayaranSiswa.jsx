import HeadLayout from '@/Components/HeadLayout';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';

export default function DataPembayaranSiswa({ auth }) {
    return (
        <>
            <HeadLayout title={'Data Pembayaran Siswa'} />

            <AuthenticatedLayout auth={auth}>
                <div className={'m-10'}>
                    f
                </div>
            </AuthenticatedLayout >
        </>
    );
}