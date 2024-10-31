import Alert from '@/Components/Alert';
import Card from '@/Components/Card';
import HeadLayout from '@/Components/HeadLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PencilSimpleLine } from '@phosphor-icons/react';

export default function TagihanPpdb({ auth }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tagihan PPDB
                </h2>
            }
        >
            <HeadLayout title="Tagihan PPDB" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 space-y-10">
                            <Card title={'Total Tagihan PPDB'} icon={<PencilSimpleLine size={20} />}>
                                <Alert variant={'red'}>
                                    Harap tunggu konfirmasi dari Admin SIPESED mengenai verifikasi data Siswa Edelweiss yang Anda daftarkan.
                                </Alert>
                            </Card>
                            <Card title={'Data Tagihan PPDB'} icon={<PencilSimpleLine size={20} />}>
                                <Alert variant={'red'}>
                                    Harap tunggu konfirmasi dari Admin SIPESED mengenai verifikasi data Siswa Edelweiss yang Anda daftarkan.
                                </Alert>
                            </Card>
                            <Card title={'Riwayat Pembayaran Saya'} icon={<PencilSimpleLine size={20} />}>
                                <Alert variant={'red'}>
                                    Harap tunggu konfirmasi dari Admin SIPESED mengenai verifikasi data Siswa Edelweiss yang Anda daftarkan.
                                </Alert>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
