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
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <HeadLayout title="Dashboard" />

            <div>
                <Card className={'mb-10'}>
                    <CardHeader>
                        <div className={'flex items-center gap-2'}>
                            <Avatar className={'rounded-lg'}>
                                <AvatarImage src={`/storage/assets/img/${auth.user.foto}`} />
                                <AvatarFallback className="rounded-lg">PP</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle>
                                    {auth.user.name}
                                </CardTitle>
                                <CardDescription>
                                    {auth.user.nis}
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

                {auth.user.is_admin ? (
                    <div className={'grid grid-cols-3 gap-5 mb-10'}>
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
