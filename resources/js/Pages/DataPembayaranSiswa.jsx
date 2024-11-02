import HeadLayout from '@/Components/HeadLayout';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import DataPembayaranSiswaData from './DataPembayaranSiswaData';

export default function DataPembayaranSiswa({ auth }) {
    return (
        <>
            <HeadLayout title={'Data Pembayaran Siswa'} />

            <AuthenticatedLayout auth={auth}>
                <DataPembayaranSiswaData />
            </AuthenticatedLayout >
        </>
    );
}