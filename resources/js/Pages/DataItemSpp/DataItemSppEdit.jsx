import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useForm } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';
import { useEffect } from 'react';


export default function DataItemSppEdit({ row }) {
    const { toast } = useToast();

    const { data, setData, patch, processing, errors, recentlySuccessful } = useForm({
        kd_spp: row.getValue('kd_spp'),
        tahun_ajaran: row.getValue('tahun_ajaran'),
        biaya: row.getValue('biaya'),
        status: row.getValue('status'),
    });

    useEffect(() => {
        processing ? toast({ description: 'Proses simpan' }) : '';
    }, [processing]);

    useEffect(() => {
        recentlySuccessful ? toast({ description: 'Tersimpan' }) : '';
    }, [recentlySuccessful]);

    function submit(e) {
        e.preventDefault();

        patch(route('data-item-spp'));
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <Dialog>
                    <DialogTrigger className={'w-full'}>
                        <Button variant={"outline"} className={'w-full'}>
                            Edit
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader className={'dark:text-white'}>
                            <DialogTitle>{row.getValue('nama_item')} - {row.getValue('kd_spp')}</DialogTitle>
                            <form onSubmit={submit} className={'space-y-5 pt-5'}>
                                <div>
                                    <Label>Tahun Ajaran</Label>
                                    <Input value={data.tahun_ajaran} onChange={(e) => setData('tahun_ajaran', e.target.value)} />
                                </div>
                                <div>
                                    <Label>Biaya</Label>
                                    <Input value={data.biaya} onChange={(e) => setData('biaya', e.target.value)} />
                                </div>
                                <div>
                                    <Label>Status</Label>
                                    <Select defaultValue={data.status ? "1" : "0"} onValueChange={(value) => setData('status', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Aktif</SelectItem>
                                            <SelectItem value="0">Nonaktif</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button type={'submit'}>
                                    Edit
                                </Button>
                            </form>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </DropdownMenuContent>
        </DropdownMenu >
    );
}