import InputError from '@/components/InputError';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Checkbox } from "@/components/ui/checkbox";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, progress, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Masukkan kredensial Anda di bawah ini untuk masuk ke akun Anda
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 before:w-60 before:h-60 before:rounded-full before:bg-white before:-z-10 before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:blur-[250px]">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" type="text" placeholder="Username" onChange={(e) => setData('username', e.target.value)} />
                                <InputError message={errors.username} />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password" onChange={(e) => setData('password', e.target.value)} />
                                <InputError message={errors.password} />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox onCheckedChange={(checked) => setData('remember', checked)} id="ingat_saya" />
                                <label
                                    htmlFor="ingat_saya"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Ingat saya
                                </label>
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Belum punya akun?
                            <Link href={route('register')} className="underline">
                                Daftar
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </GuestLayout>
    );
}
