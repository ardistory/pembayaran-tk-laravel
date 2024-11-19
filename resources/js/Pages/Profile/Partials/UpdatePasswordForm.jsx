import InputError from '@/components/InputError';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const { toast } = useToast();
    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        processing ? toast({ description: 'Proses simpan' }) : '';
    }, [processing]);

    useEffect(() => {
        recentlySuccessful ? toast({ description: 'Tersimpan' }) : '';
    }, [recentlySuccessful]);

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <form onSubmit={updatePassword} className="mt-6 space-y-6">
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="current_password">Password sekarang</Label>
                <Input ref={passwordInput} value={data.current_password} onChange={(e) => setData('current_password', e.target.value)} type="text" id="current_password" placeholder="Password sekarang" />
                <InputError message={errors.current_password} />
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password">Password baru</Label>
                <Input ref={currentPasswordInput} value={data.password} onChange={(e) => setData('password', e.target.value)} type="text" id="password" placeholder="Password baru" />
                <InputError message={errors.password} />
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password_confirmation">Ulangi password</Label>
                <Input value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} type="text" id="password_confirmation" placeholder="Ulangi password" />
                <InputError message={errors.password_confirmation} />
            </div>
            <Button type="submit">
                Simpan
            </Button>
        </form>
    );
}
