import HeadLayout from '@/Components/HeadLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Cube } from '@phosphor-icons/react';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <HeadLayout title="Dashboard" />

            <div>
                <Card className={'mb-10'}>
                    <CardContent className={'p-5'}>
                        <p className={'text-lg'}><span className={'font-bold'}>{auth.user.is_admin ? 'Nama' : 'Nis'} :</span> {auth.user.is_admin ? auth.user.name : auth.user.nis}</p>
                        <p className={'text-lg'}><span className={'font-bold'}>Username :</span> {auth.user.username}</p>
                        <p className={'text-lg'}><span className={'font-bold'}>Nomor Telepon :</span> {auth.user.no_telepon}</p>
                    </CardContent>
                </Card>

                {auth.user.is_admin ? (
                    <div className={'grid grid-cols-3 gap-5'}>
                        <Card className="rounded-lg w-full col-span-3 md:col-span-1">
                            <CardHeader>
                                <CardTitle>TOTAL SEMUA SISWA AKTIF</CardTitle>
                                <CardDescription className={'flex items-center justify-between'}>
                                    <span className={'text-4xl font-bold'}>6</span>
                                    <Cube size={32} />
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="rounded-lg w-full col-span-3 md:col-span-1">
                            <CardHeader>
                                <CardTitle>PEMBAYARAN DI VALIDASI</CardTitle>
                                <CardDescription className={'flex items-center justify-between'}>
                                    <span className={'text-4xl font-bold'}>6</span>
                                    <Cube size={32} />
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="rounded-lg w-full col-span-3 md:col-span-1">
                            <CardHeader>
                                <CardTitle>PEMBAYARAN LUNAS</CardTitle>
                                <CardDescription className={'flex items-center justify-between'}>
                                    <span className={'text-4xl font-bold'}>6</span>
                                    <Cube size={32} />
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="rounded-lg w-full col-span-3 md:col-span-1">
                            <CardHeader>
                                <CardTitle>PEMBAYARAN MENUNGGAK</CardTitle>
                                <CardDescription className={'flex items-center justify-between'}>
                                    <span className={'text-4xl font-bold'}>6</span>
                                    <Cube size={32} />
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="rounded-lg w-full col-span-3 md:col-span-1">
                            <CardHeader>
                                <CardTitle>SISWA LUNAS</CardTitle>
                                <CardDescription className={'flex items-center justify-between'}>
                                    <span className={'text-4xl font-bold'}>6</span>
                                    <Cube size={32} />
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="rounded-lg w-full col-span-3 md:col-span-1">
                            <CardHeader>
                                <CardTitle>SISWA MENUNGGAK</CardTitle>
                                <CardDescription className={'flex items-center justify-between'}>
                                    <span className={'text-4xl font-bold'}>6</span>
                                    <Cube size={32} />
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                ) : ''}
            </div>
        </AuthenticatedLayout>
    );
}
