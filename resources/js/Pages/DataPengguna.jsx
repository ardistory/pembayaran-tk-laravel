import HeadLayout from '@/components/HeadLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DataPenggunaRender from './DataPengguna/DataPenggunaRender';

export default function DataPengguna({ auth, dataPengguna }) {

    return (
        <>
            <HeadLayout title="DataPengguna" />

            <AuthenticatedLayout auth={auth}>
                <DataPenggunaRender data={dataPengguna} />
            </AuthenticatedLayout>
        </>
    );
};