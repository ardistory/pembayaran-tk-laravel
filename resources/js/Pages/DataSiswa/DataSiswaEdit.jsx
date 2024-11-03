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
import { useEffect, useState } from 'react';
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

export default function DataSiswaEdit({ row }) {
    const { toast } = useToast();
    const [date, setDate] = useState();

    const { data, setData, patch, processing, errors, recentlySuccessful } = useForm({
        name: row.getValue('name'),
        nis: row.getValue('nis'),
        username: row.getValue('username'),
        no_telepon: row.getValue('no_telepon'),
        tahun_ajaran: row.getValue('tahun_ajaran'),
        jenis_kelamin: row.getValue('jenis_kelamin'),
        kelas: row.getValue('kelas'),
        tanggal_lahir: row.getValue('tanggal_lahir'),
        alamat: row.getValue('alamat'),
        is_verified: row.getValue('is_verified'),
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
                        <ScrollArea className={'md:h-[400px]'}>
                            <DialogHeader className={'dark:text-white'}>
                                <DialogTitle>{row.getValue('name')}</DialogTitle>
                                <form onSubmit={submit} className={'space-y-5 pt-5'}>
                                    <div>
                                        <Label>Nama</Label>
                                        <Input value={data.name} onChange={(e) => setData('nama', e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Nis</Label>
                                        <Input value={data.nis} disabled={true} onChange={(e) => setData('nis', e.target.value)} />
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
                                        <Input onChange={(e) => setData('tahun_ajaran', e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Jenis Kelamin</Label>
                                        <Select>
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
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date ? format(date, "PPP") : <span>Pilih Tanggal</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={() => alert(date)}
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
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date ? format(date, "PPP") : <span>Pilih Tanggal</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={() => alert(date)}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div>
                                        <Label>Alamat</Label>
                                        <Textarea onChange={(e) => setData('tahun_ajaran', e.target.value)} />
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