import InputError from '@/Components/InputError';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { router, useForm, usePage } from '@inertiajs/react';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useEffect } from 'react';

export default function UpdateProfileInformation({ className = '' }) {
    const user = usePage().props.auth.user;
    const { toast } = useToast();

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            nis: user.nis,
            username: user.username,
            no_telepon: user.no_telepon || '',
            foto: user.foto,
        });

    const submit = (e) => {
        e.preventDefault();

        post(route('profile.update'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                window.location.reload(true);
            },
        });
    };

    useEffect(() => {
        processing ? toast({ description: 'Proses simpan' }) : '';
    }, [processing]);

    useEffect(() => {
        recentlySuccessful ? toast({ description: 'Tersimpan' }) : '';
    }, [recentlySuccessful]);

    return (
        <form onSubmit={submit} className={'space-y-5'}>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="nis">Nis</Label>
                <Input value={data.nis} onChange={(e) => setData('nis', e.target.value)} type="text" id="nis" placeholder="Nis" />
                <InputError message={errors.nis} />
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="username">Username</Label>
                <Input value={data.username} disabled={true} type="text" id="username" placeholder="Username" />
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="no_telepon">Nomor Telepon</Label>
                <Input value={data.no_telepon} onChange={(e) => setData('no_telepon', e.target.value)} type="text" id="no_telepon" placeholder="Nomor Telepon" />
                <InputError message={errors.no_telepon} />
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="foto">Foto (opsional)</Label>
                <Input onChange={(e) => setData('foto', e.target.files[0])} type="file" id="foto" />
                <InputError message={errors.foto} />
            </div>
            <Button type="submit">
                Simpan
            </Button>
        </form>
    );
}
