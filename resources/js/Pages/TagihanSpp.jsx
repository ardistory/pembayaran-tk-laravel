import HeadLayout from '@/Components/HeadLayout';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TotalTagihanSpp from './Dashboard/TotalTagihanSpp';
import DataTagihanSpp from './Dashboard/DataTagihanSpp';
import RiwayatPembayaranSaya from './Dashboard/RiwayatPembayaranSaya';

export default function TagihanSpp({ auth, itemSpp, pembayaranUser }) {
    return (
        <>
            <HeadLayout title="Tagihan PPDB" />

            <AuthenticatedLayout auth={auth}>
                <div className={'space-y-5 mb-10'}>
                    <TotalTagihanSpp auth={auth} itemSpp={itemSpp} pembayaranUser={pembayaranUser} />
                    <DataTagihanSpp auth={auth} />
                    <RiwayatPembayaranSaya auth={auth} />
                </div >
            </AuthenticatedLayout >
        </>
    );
}
