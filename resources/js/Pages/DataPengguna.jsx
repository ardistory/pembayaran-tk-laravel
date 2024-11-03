import HeadLayout from '@/Components/HeadLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function DataPengguna({ auth }) {
    return (
        <>
            <HeadLayout title="DataPengguna" />

            <AuthenticatedLayout auth={auth}>
                DataPengguna
            </AuthenticatedLayout>
        </>
    );
};