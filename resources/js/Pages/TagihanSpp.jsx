import HeadLayout from '@/Components/HeadLayout';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const cards = [
    {
        title: 'Total Tagihan SPP',
        error: 'Harap tunggu konfirmasi dari Admin SIPESED mengenai verifikasi data Siswa Edelweiss yang Anda daftarkan.'
    },
    {
        title: 'Data Tagihan SPP',
        error: 'Harap tunggu konfirmasi dari Admin SIPESED mengenai verifikasi data Siswa Edelweiss yang Anda daftarkan.'
    },
    {
        title: 'Riwayat Pembayaran Saya',
        error: 'Harap tunggu konfirmasi dari Admin SIPESED mengenai verifikasi data Siswa Edelweiss yang Anda daftarkan.'
    },
];

export default function TagihanSpp({ auth }) {
    return (
        <>
            <HeadLayout title="Tagihan PPDB" />

            <AuthenticatedLayout auth={auth}>
                <div className={'space-y-5'}>
                    {cards.map(card => (
                        <Card key={card.title}>
                            <CardHeader>
                                <CardTitle>{card.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {auth.user.is_verified ? (
                                    'Verified'
                                ) : (
                                    <>
                                        <Alert variant={'destructive'}>
                                            <AlertDescription>
                                                {card.error}
                                            </AlertDescription>
                                        </Alert>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div >
            </AuthenticatedLayout >
        </>
    );
}
