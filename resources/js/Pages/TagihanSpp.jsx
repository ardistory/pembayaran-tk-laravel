import HeadLayout from '@/Components/HeadLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TotalTagihanSpp from './Dashboard/TotalTagihanSpp';
import DataTagihanSpp from './Dashboard/DataTagihanSpp';
import RiwayatPembayaranSaya from './Dashboard/RiwayatPembayaranSaya';

export default function TagihanSpp({ auth, itemSpp, pembayaranUser, totalBiaya, sudahBayar, sisaTagihan }) {
    return (
        <>
            <HeadLayout title="Tagihan PPDB" />

            <AuthenticatedLayout auth={auth}>
                <div className={'space-y-5 mb-10'}>
                    <TotalTagihanSpp auth={auth} itemSpp={itemSpp} pembayaranUser={pembayaranUser} totalBiaya={totalBiaya} sudahBayar={sudahBayar} sisaTagihan={sisaTagihan} />
                    <DataTagihanSpp auth={auth} />
                    <RiwayatPembayaranSaya auth={auth} />
                </div >
            </AuthenticatedLayout >
        </>
    );
}
