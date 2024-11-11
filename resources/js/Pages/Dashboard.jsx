import HeadLayout from '@/Components/HeadLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BadgeCheck, ReceiptText, TicketCheck, TicketX, User, UserRoundCheck, UserRoundX } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Dashboard({ auth }) {
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
                <Card className={'mb-5'}>
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
                                    <span className={'text-4xl font-bold'}>6</span>
                                    <ReceiptText />
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="rounded-lg w-full col-span-3 md:col-span-2">
                            <CardHeader>
                                <CardTitle>TAGIHAN SPP DIBAYAR</CardTitle>
                                <CardDescription className={'flex items-center justify-between'}>
                                    <span className={'text-4xl font-bold'}>6</span>
                                    <BadgeCheck />
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="rounded-lg w-full col-span-3 md:col-span-2">
                            <CardHeader>
                                <CardTitle>SISA TAGIHAN</CardTitle>
                                <CardDescription className={'flex items-center justify-between'}>
                                    <span className={'text-4xl font-bold'}>6</span>
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
                                    <span className={'text-4xl font-bold'}>6</span>
                                    <User />
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="rounded-lg w-full col-span-3 md:col-span-1">
                            <CardHeader>
                                <CardTitle>PEMBAYARAN DI VALIDASI</CardTitle>
                                <CardDescription className={'flex items-center justify-between'}>
                                    <span className={'text-4xl font-bold'}>6</span>
                                    <BadgeCheck />
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="rounded-lg w-full col-span-3 md:col-span-1">
                            <CardHeader>
                                <CardTitle>PEMBAYARAN LUNAS</CardTitle>
                                <CardDescription className={'flex items-center justify-between'}>
                                    <span className={'text-4xl font-bold'}>6</span>
                                    <TicketCheck />
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="rounded-lg w-full col-span-3 md:col-span-1">
                            <CardHeader>
                                <CardTitle>PEMBAYARAN MENUNGGAK</CardTitle>
                                <CardDescription className={'flex items-center justify-between'}>
                                    <span className={'text-4xl font-bold'}>6</span>
                                    <TicketX />
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="rounded-lg w-full col-span-3 md:col-span-1">
                            <CardHeader>
                                <CardTitle>SISWA LUNAS</CardTitle>
                                <CardDescription className={'flex items-center justify-between'}>
                                    <span className={'text-4xl font-bold'}>6</span>
                                    <UserRoundCheck />
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="rounded-lg w-full col-span-3 md:col-span-1">
                            <CardHeader>
                                <CardTitle>SISWA MENUNGGAK</CardTitle>
                                <CardDescription className={'flex items-center justify-between'}>
                                    <span className={'text-4xl font-bold'}>6</span>
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
