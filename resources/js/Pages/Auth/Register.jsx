import InputError from '@/Components/InputError';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, errors, reset } = useForm({
        nis: '',
        name: '',
        username: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <ScrollArea className={'md:h-[400px] rounded-xl'}>
                <form onSubmit={submit}>
                    <Card className="mx-auto w-96">
                        <CardHeader>
                            <CardTitle className="text-2xl">Daftar</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 before:w-60 before:h-60 before:rounded-full before:bg-white before:-z-10 before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:blur-[250px]">
                                <div className="grid gap-2">
                                    <Label htmlFor="nis">Nis</Label>
                                    <Input id="nis" type="text" value={data.nis} onChange={(e) => setData('nis', e.target.value)} />
                                    <InputError message={errors.nis} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                    <InputError message={errors.name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input id="username" type="text" value={data.username} onChange={(e) => setData('username', e.target.value)} />
                                    <InputError message={errors.username} />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                    </div>
                                    <Input id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                                    <InputError message={errors.password} />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password_confirmation">Ulangi password</Label>
                                    </div>
                                    <Input id="password_confirmation" type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} />
                                    <InputError message={errors.password} />
                                </div>
                                <Button type="submit" className="w-full">
                                    Daftar
                                </Button>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Sudah mendaftar?
                                <Link href={route('login')} className="underline">
                                    Login
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </ScrollArea>
        </GuestLayout >
    );
}
