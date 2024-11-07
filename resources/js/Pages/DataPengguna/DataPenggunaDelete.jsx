import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function DataPenggunaDelete({ row }) {
    const { data, submit, recentlySuccessful } = useForm({
        id: row.getValue('id'),
        name: row.getValue('name'),
    });

    function handleSubmit(e) {
        e.preventDefault();

        submit('delete', route('data-pengguna'));
    }

    useEffect(() => {
        if (recentlySuccessful) {
            toast({ description: `Hapus ${data.name}` });
        }
    }, [recentlySuccessful]);

    return (
        <Dialog>
            <DialogTrigger className={'w-full'}>
                <Button variant={"outline"} className={'w-full'}>
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Hapus {data.name}?</DialogTitle>
                    <DialogDescription>
                        Tindakan ini tidak dapat dibatalkan. Tindakan ini akan menghapus akun secara permanen
                        dan menghapus data dari server kami.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <form onSubmit={handleSubmit}>
                        <Button type="submit">Confirm</Button>
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}