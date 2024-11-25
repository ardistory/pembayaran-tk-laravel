import HeadLayout from '@/components/HeadLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TotalTagihanSpp from './TagihanSpp/TotalTagihanSpp';
import RiwayatPembayaranSaya from './TagihanSpp/RiwayatPembayaranSaya';
import DataTagihanSpp from './TagihanSpp/DataTagihanSpp/DataTagihanSpp';

export default function TagihanSpp({ auth, itemSpp, pembayaranUser, totalBiaya, sudahBayar, sisaTagihan, pembayaranDetails, riwayatPembayaranSaya }) {
    return (
        <>
            <HeadLayout title="Tagihan PPDB" />

            <AuthenticatedLayout auth={auth}>
                <div className={'space-y-5 mb-10'}>
                    <TotalTagihanSpp auth={auth} itemSpp={itemSpp} pembayaranUser={pembayaranUser} totalBiaya={totalBiaya} sudahBayar={sudahBayar} sisaTagihan={sisaTagihan} />
                    <DataTagihanSpp auth={auth} pembayaranDetails={pembayaranDetails} />
                    <RiwayatPembayaranSaya auth={auth} riwayatPembayaranSaya={riwayatPembayaranSaya} />
                </div >
            </AuthenticatedLayout >
        </>
    );
}
