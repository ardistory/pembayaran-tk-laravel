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

    const { data, setData, patch, processing, errors, recentlySuccessful } = useForm({
        name: row.getValue('name'),
        nis: row.getValue('nis'),
        kelas: row.getValue('kelas') || '',
        foto: row.getValue('foto') || '',
        tahun_ajaran: row.getValue('tahun_ajaran') || '',
        jenis_kelamin: row.getValue('jenis_kelamin') || '',
        created_at: row.getValue('created_at') || '',
        tanggal_lahir: row.getValue('tanggal_lahir') || '',
        alamat: row.getValue('alamat') || '',
    });

    useEffect(() => {
        processing ? toast({ description: 'Proses simpan' }) : '';
    }, [processing]);

    useEffect(() => {
        recentlySuccessful ? toast({ description: 'Tersimpan' }) : '';
    }, [recentlySuccessful]);

    function submit(e) {
        e.preventDefault();
        console.log(data);
        patch(route('data-siswa'), {
            forceFormData: true
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
                                        <Input value={data.tahun_ajaran} onChange={(e) => setData('tahun_ajaran', e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Jenis Kelamin</Label>
                                        <Select onValueChange={(value) => setData('jenis_kelamin', value)}>
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
                                                        !data.created_at && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {data.created_at ? format(new Date(data.created_at), "PPP") : <span>Pilih Tanggal</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={data.created_at ? new Date(data.created_at) : null}
                                                    onSelect={(selectedDate) => setData("created_at", selectedDate)}
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
                                                    onSelect={(selectedDate) => setData("tanggal_lahir", selectedDate)}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div>
                                        <Label>Alamat</Label>
                                        <Textarea onChange={(e) => setData('alamat', e.target.value)} />
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