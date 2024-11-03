import InputError from '@/Components/InputError';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function UpdateProfileInformation({ className = '' }) {
    const user = usePage().props.auth.user;
    const { toast } = useToast();

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            nis: user.nis,
            username: user.username,
            no_telepon: user.no_telepon || ''
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true
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
                <Input value={data.username} onChange={(e) => setData('username', e.target.value)} disabled={true} type="text" id="username" placeholder="Username" />
                <InputError message={errors.username} />
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="no_telepon">Nomor Telepon</Label>
                <Input value={data.no_telepon} onChange={(e) => setData('no_telepon', e.target.value)} type="text" id="no_telepon" placeholder="Nomor Telepon" />
                <InputError message={errors.no_telepon} />
            </div>
            <Button type="submit">
                Simpan
            </Button>
        </form>
    );
}
