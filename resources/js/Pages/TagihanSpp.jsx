import Alert from '@/Components/Alert';
import Card from '@/Components/Card';
import HeadLayout from '@/Components/HeadLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PencilSimpleLine } from '@phosphor-icons/react';

export default function TagihanSpp({ auth }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <HeadLayout title="Tagihan SPP" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 space-y-10">
                            <Card title={'Total Tagihan SPP'} icon={<PencilSimpleLine size={20} />}>
                                <Alert variant={'red'}>
                                    Harap tunggu konfirmasi dari Admin SIPESED mengenai verifikasi data Siswa Edelweiss yang Anda daftarkan.
                                </Alert>
                            </Card>
                            <Card title={'Data Tagihan SPP'} icon={<PencilSimpleLine size={20} />}>
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
