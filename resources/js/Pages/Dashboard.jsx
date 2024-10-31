import HeadLayout from '@/Components/HeadLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <HeadLayout title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p className={'text-lg'}><span className={'font-bold'}>Nis :</span> {auth.user.nis}</p>
                            <p className={'text-lg'}><span className={'font-bold'}>Username :</span> {auth.user.username}</p>
                            <p className={'text-lg'}><span className={'font-bold'}>Nomor Telepon :</span> {auth.user.no_telepon}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
