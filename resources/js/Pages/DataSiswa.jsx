import HeadLayout from '@/Components/HeadLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DataSiswaRender from './DataSiswa/DataSiswaRender';


export default function DataSiswa({ auth, dataSiswa }) {
    return (
        <>
            <HeadLayout title="Data Siswa" />

            <AuthenticatedLayout auth={auth}>
                <DataSiswaRender data={dataSiswa} />
            </AuthenticatedLayout>
        </>
    );
};