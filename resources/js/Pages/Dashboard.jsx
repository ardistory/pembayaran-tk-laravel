import HeadLayout from '@/Components/HeadLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Cube, UserCircle } from '@phosphor-icons/react';
import { BellIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';

const notifications = [
    {
        title: "Your call has been confirmed.",
        description: "1 hour ago",
    },
    {
        title: "You have a new message!",
        description: "1 hour ago",
    },
    {
        title: "Your subscription is expiring soon!",
        description: "2 hours ago",
    },
];

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <HeadLayout title="Dashboard" />

            <div className="py-12 pb-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        {auth.user.is_admin ? (
                            <div className="p-6 text-gray-900">
                                <div className={'flex items-center gap-2'}>
                                    <UserCircle size={60} />
                                    <div>
                                        <p className={'text-lg'}><span className={'font-bold'}>Nama :</span> {auth.user.name}</p>
                                        <p className={'text-lg'}><span className={'font-bold'}>Username :</span> {auth.user.username}</p>
                                        <p className={'text-lg'}><span className={'font-bold'}>Nomor Telepon :</span> {auth.user.no_telepon}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="p-6 text-gray-900">
                                <p className={'text-lg'}><span className={'font-bold'}>Nis :</span> {auth.user.nis}</p>
                                <p className={'text-lg'}><span className={'font-bold'}>Username :</span> {auth.user.username}</p>
                                <p className={'text-lg'}><span className={'font-bold'}>Nomor Telepon :</span> {auth.user.no_telepon}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {auth.user.is_admin ? (
                <div className={'pb-12'}>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 grid grid-cols-3 gap-5">
                                <Card className="rounded-lg w-full col-span-3 md:col-span-1">
                                    <CardHeader>
                                        <CardTitle className={'text-gray-500'}>TOTAL SEMUA SISWA AKTIF</CardTitle>
                                        <CardDescription className={'flex items-center justify-between'}>
                                            <span className={'text-4xl font-bold'}>6</span>
                                            <Cube size={32} />
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card className="rounded-lg w-full col-span-3 md:col-span-1">
                                    <CardHeader>
                                        <CardTitle className={'text-gray-500'}>PEMBAYARAN DI VALIDASI</CardTitle>
                                        <CardDescription className={'flex items-center justify-between'}>
                                            <span className={'text-4xl font-bold'}>6</span>
                                            <Cube size={32} />
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card className="rounded-lg w-full col-span-3 md:col-span-1">
                                    <CardHeader>
                                        <CardTitle className={'text-gray-500'}>PEMBAYARAN LUNAS</CardTitle>
                                        <CardDescription className={'flex items-center justify-between'}>
                                            <span className={'text-4xl font-bold'}>6</span>
                                            <Cube size={32} />
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card className="rounded-lg w-full col-span-3 md:col-span-1">
                                    <CardHeader>
                                        <CardTitle className={'text-gray-500'}>PEMBAYARAN MENUNGGAK</CardTitle>
                                        <CardDescription className={'flex items-center justify-between'}>
                                            <span className={'text-4xl font-bold'}>6</span>
                                            <Cube size={32} />
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card className="rounded-lg w-full col-span-3 md:col-span-1">
                                    <CardHeader>
                                        <CardTitle className={'text-gray-500'}>SISWA LUNAS</CardTitle>
                                        <CardDescription className={'flex items-center justify-between'}>
                                            <span className={'text-4xl font-bold'}>6</span>
                                            <Cube size={32} />
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card className="rounded-lg w-full col-span-3 md:col-span-1">
                                    <CardHeader>
                                        <CardTitle className={'text-gray-500'}>SISWA MENUNGGAK</CardTitle>
                                        <CardDescription className={'flex items-center justify-between'}>
                                            <span className={'text-4xl font-bold'}>6</span>
                                            <Cube size={32} />
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            ) : ''}
        </AuthenticatedLayout>
    );
}
