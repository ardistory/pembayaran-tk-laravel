import HeadLayout from '@/components/HeadLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BadgeCheck, ReceiptText, TicketCheck, TicketX, User, UserRoundCheck, UserRoundX } from 'lucide-react';

function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

export default function Dashboard({
    auth,
    totalBiaya,
    sudahBayar,
    sisaTagihan,
    totalSiswaAktif,
    pembayaranDiValidasi,
    pembayaranLunas,
    pembayaranMenunggak,
    siswaLunas,
    siswaMenunggak, }) {
    const user = auth.user;

    const userDetails = [
        {
            title: 'NIS',
            value: user.nis,
        },
        {
            title: 'Angkatan',
            value: user.tahun_ajaran,
        },
        {
            title: 'Tanggal Lahir',
            value: user.tanggal_lahir,
        },
        {
            title: 'Jenis Kelamin',
            value: user.jenis_kelamin,
        },
        {
            title: 'Alamat',
            value: user.alamat,
        },
        {
            title: 'Kelas',
            value: user.kelas,
        },
        {
            title: 'Tanggal Masuk',
            value: user.tanggal_masuk,
        },
        {
            title: 'Username',
            value: user.username,
        },
        {
            title: 'Nomor Telepon',
            value: user.no_telepon,
        },
    ];

    return (
        <AuthenticatedLayout auth={auth}>
            <HeadLayout title="Dashboard" />

            <div>
                <Card className={'mb-5 flex justify-between'}>
                    <div>
                        <CardHeader>
                            <div className={'flex items-center gap-2'}>
                                <Avatar className={'rounded-lg'}>
                                    <AvatarImage src={user.foto} />
                                    <AvatarFallback className="rounded-lg">PP</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle>
                                        {user.name ? user.name : user.username}
                                    </CardTitle>
                                    <CardDescription>
                                        {user.nis}
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={() => router.visit(route('profile.edit'))}>
                                Edit Profile
                            </Button>
                        </CardContent>
                    </div>
                    <Card className={'flex items-center m-5'}>
                        <CardHeader>
                            <CardTitle>BCA</CardTitle>
                            <CardDescription>0721321323</CardDescription>
                        </CardHeader>
                        <CardHeader>
                            <CardTitle>Mandiri</CardTitle>
                            <CardDescription>213213213</CardDescription>
                        </CardHeader>
                    </Card>
                </Card>

                {!user.is_admin && user.is_verified ? (
                    <div className={'grid grid-cols-3 md:grid-rows-3 gap-5 mb-10'}>
                        <Card className={'col-span-3 md:col-span-1 md:row-span-3'}>
                            <CardHeader>
                                {userDetails.map(detail => (
                                    <div key={detail.title}>
                                        <CardTitle>{detail.title}</CardTitle>
                                        {(detail.title == 'Tanggal Lahir' && detail.title == 'Tanggal Masuk') ? (
                                            <CardDescription>{detail.value ?? '-'}</CardDescription>
                                        ) : (
                                            <CardDescription>{detail.value ?? '-'}</CardDescription>
                                        )}
                                    </div>
                                ))}
                            </CardHeader>
                        </Card>
                        <Card className="rounded-lg w-full col-span-3 md:col-span-2">
                            <CardHeader>
                                <CardTitle>TOTAL TAGIHAN SPP</CardTitle>
                                <CardDescription className={'flex items-center justify-between'}>
                                    <span className={'text-4xl font-bold'}>{formatRupiah(totalBiaya)}</span>
                                    <ReceiptText />
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="rounded-lg w-full col-span-3 md:col-span-2">
                            <CardHeader>
                                <CardTitle>TAGIHAN SPP DIBAYAR</CardTitle>
                                <CardDescription className={'flex items-center justify-between'}>
                                    <span className={'text-4xl font-bold'}>{formatRupiah(sudahBayar)}</span>
                                    <BadgeCheck />
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="rounded-lg w-full col-span-3 md:col-span-2">
                            <CardHeader>
                                <CardTitle>SISA TAGIHAN</CardTitle>
                                <CardDescription className={'flex items-center justify-between'}>
                                    <span className={'text-4xl font-bold'}>{formatRupiah(sisaTagihan)}</span>
                                    <TicketCheck />
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                ) : ('')}

                {user.is_admin ? (
                    <div className={'grid grid-cols-3 gap-5 mb-10'}>
                        <Card className="rounded-lg w-full col-span-3 md:col-span-1">
                            <CardHeader>
                                <CardTitle>TOTAL SEMUA SISWA AKTIF</CardTitle>
                                <CardDescription className={'flex items-center justify-between'}>
                                    <span className={'text-4xl font-bold'}>{totalSiswaAktif}</span>
                                    <User />
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="rounded-lg w-full col-span-3 md:col-span-1">
                            <CardHeader>
                                <CardTitle>PEMBAYARAN DI VALIDASI</CardTitle>
                                <CardDescription className={'flex items-center justify-between'}>
                                    <span className={'text-4xl font-bold'}>{pembayaranDiValidasi}</span>
                                    <BadgeCheck />
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="rounded-lg w-full col-span-3 md:col-span-1">
                            <CardHeader>
                                <CardTitle>PEMBAYARAN LUNAS</CardTitle>
                                <CardDescription className={'flex items-center justify-between'}>
                                    <span className={'text-4xl font-bold'}>{pembayaranLunas}</span>
                                    <TicketCheck />
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="rounded-lg w-full col-span-3 md:col-span-1">
                            <CardHeader>
                                <CardTitle>PEMBAYARAN MENUNGGAK</CardTitle>
                                <CardDescription className={'flex items-center justify-between'}>
                                    <span className={'text-4xl font-bold'}>{pembayaranMenunggak}</span>
                                    <TicketX />
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="rounded-lg w-full col-span-3 md:col-span-1">
                            <CardHeader>
                                <CardTitle>SISWA LUNAS</CardTitle>
                                <CardDescription className={'flex items-center justify-between'}>
                                    <span className={'text-4xl font-bold'}>{siswaLunas}</span>
                                    <UserRoundCheck />
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="rounded-lg w-full col-span-3 md:col-span-1">
                            <CardHeader>
                                <CardTitle>SISWA MENUNGGAK</CardTitle>
                                <CardDescription className={'flex items-center justify-between'}>
                                    <span className={'text-4xl font-bold'}>{siswaMenunggak}</span>
                                    <UserRoundX />
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                ) : ''}
            </div>
        </AuthenticatedLayout>
    );
}
