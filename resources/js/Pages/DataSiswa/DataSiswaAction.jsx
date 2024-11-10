import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useForm } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';
import { useEffect } from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from '@/components/ui/textarea';

export default function DataSiswaAction({ row }) {
    const { toast } = useToast();

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: row.getValue('name'),
        nis: row.getValue('nis'),
        username: row.getValue('username'),
        kelas: row.getValue('kelas') || '',
        foto: row.getValue('foto'),
        tahun_ajaran: row.getValue('tahun_ajaran') || '',
        jenis_kelamin: row.getValue('jenis_kelamin') || '',
        tanggal_masuk: row.getValue('tanggal_masuk') || '',
        tanggal_lahir: row.getValue('tanggal_lahir') || '',
        alamat: row.getValue('alamat') || '',
        no_telepon: row.getValue('no_telepon') || '',
    });

    function selectedDate(e, propertyName) {
        const dateObj = new Date(e);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        setData(propertyName, formattedDate);
    }

    useEffect(() => {
        processing ? toast({ description: 'Proses simpan' }) : '';
    }, [processing]);

    useEffect(() => {
        recentlySuccessful ? toast({ description: 'Tersimpan' }) : '';
    }, [recentlySuccessful]);

    function handleSubmit(e) {
        e.preventDefault();

        post(route('data-siswa'), {
            forceFormData: true,
            onSuccess: () => {
                window.location.reload(true);
            },
        });
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
                        <ScrollArea className={'md:h-[400px]'}>
                            <DialogHeader className={'dark:text-white'}>
                                <DialogTitle>{row.getValue('name')}</DialogTitle>
                                <form onSubmit={handleSubmit} className={'space-y-2 md:space-y-5 pt-5'}>
                                    <div>
                                        <Label>Nama</Label>
                                        <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Nis</Label>
                                        <Input value={data.nis} disabled={true} onChange={(e) => setData('nis', e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Username</Label>
                                        <Input value={data.username} disabled={true} onChange={(e) => setData('username', e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Kelas</Label>
                                        <Input value={data.kelas} onChange={(e) => setData('kelas', e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Foto</Label>
                                        <Input type={'file'} onChange={(e) => setData('foto', e.target.files[0])} />
                                    </div>
                                    <div>
                                        <Label>Tahun Ajaran</Label>
                                        <Input value={data.tahun_ajaran} onChange={(e) => setData('tahun_ajaran', e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Jenis Kelamin</Label>
                                        <Select defaultValue={data.jenis_kelamin} onValueChange={(value) => setData('jenis_kelamin', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Jenis Kelamin" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Laki-Laki">Laki-Laki</SelectItem>
                                                <SelectItem value="Perempuan">Perempuan</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className={'grid gap-2'}>
                                        <Label>Tanggal Masuk</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !data.tanggal_masuk && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {data.tanggal_masuk ? format(new Date(data.tanggal_masuk), "PPP") : <span>Pilih Tanggal</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={data.tanggal_masuk ? new Date(data.tanggal_masuk) : null}
                                                    onSelect={(e) => selectedDate(e, 'tanggal_masuk')}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className={'grid gap-2'}>
                                        <Label>Tanggal Lahir</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !data.tanggal_lahir && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {data.tanggal_lahir ? format(new Date(data.tanggal_lahir), "PPP") : <span>Pilih Tanggal</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={data.tanggal_lahir ? new Date(data.tanggal_lahir) : null}
                                                    onSelect={(e) => selectedDate(e, 'tanggal_lahir')}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div>
                                        <Label>Nomor Telepon</Label>
                                        <Input value={data.no_telepon} onChange={(e) => setData('no_telepon', e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Alamat</Label>
                                        <Textarea value={data.alamat} onChange={(e) => setData('alamat', e.target.value)} />
                                    </div>
                                    <Button type={'submit'}>
                                        Edit
                                    </Button>
                                </form>
                            </DialogHeader>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            </DropdownMenuContent>
        </DropdownMenu >
    );
}