import HeadLayout from '@/Components/HeadLayout';
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