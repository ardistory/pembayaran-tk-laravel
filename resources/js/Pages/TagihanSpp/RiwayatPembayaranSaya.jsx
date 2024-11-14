import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RiwayatPembayaranRender from './RiwayatPembayaran/RiwayatPembayaranRender';

export default function RiwayatPembayaranSaya({ auth, riwayatPembayaranSaya }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Riwayat Pembayaran Saya</CardTitle>
            </CardHeader>
            <CardContent>
                <RiwayatPembayaranRender data={riwayatPembayaranSaya} />
            </CardContent>
        </Card>
    );
}