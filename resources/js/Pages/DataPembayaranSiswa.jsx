import HeadLayout from '@/components/HeadLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DataPembayaranSiswaRender from './DataPembayaranSiswa/DataPembayaranSiswaRender';

export default function DataPembayaranSiswa({ auth, pembayaranDetails }) {
    return (
        <>
            <HeadLayout title={'Data Pembayaran Siswa'} />

            <AuthenticatedLayout auth={auth}>
                <DataPembayaranSiswaRender data={pembayaranDetails} />
            </AuthenticatedLayout >
        </>
    );
}