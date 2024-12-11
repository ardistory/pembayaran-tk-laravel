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
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function DataPembayaranSiswaAction({ row }) {
    const { toast } = useToast();

    const { data, setData, patch, processing, recentlySuccessful } = useForm({
        pembayaran_id: row.getValue('pembayaran_id'),
        nama_item: row.getValue('nama_item'),
        user_name: row.getValue('user_name'),
        tahun_ajaran: row.getValue('tahun_ajaran'),
        biaya: row.getValue('biaya'),
        bayar: row.getValue('bayar'),
        sisa_bayar: row.getValue('sisa_bayar'),
        bukti_bayar: row.getValue('bukti_bayar'),
        status_pembayaran: row.getValue('status_pembayaran'),
        is_verified: row.getValue('is_verified'),
        is_rejected: false,
        created_at: row.getValue('created_at'),
    });

    function formatRupiah(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    }

    useEffect(() => {
        processing ? toast({ description: 'Proses simpan' }) : '';
    }, [processing]);

    useEffect(() => {
        recentlySuccessful ? toast({ description: 'Tersimpan' }) : '';
    }, [recentlySuccessful]);

    function handleSubmit(e) {
        e.preventDefault();

        patch(route('data-pembayaran-siswa'));
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
                            Edit & Lihat Detail
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <ScrollArea className={'md:h-[400px]'}>
                            <DialogHeader className={'dark:text-white'}>
                                <DialogTitle>
                                    <p>{row.getValue('nama_item')} - {row.getValue('user_name')}</p>
                                    <p className={'text-sm'}>Di bayar pada {new Date(row.getValue('created_at')).toISOString().split('T')[0]}</p>
                                    <Badge>{data.status_pembayaran}</Badge>
                                </DialogTitle>
                                <form onSubmit={handleSubmit} className={'space-y-2 md:space-y-5 pt-5'}>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                Total
                                            </CardTitle>
                                            <CardDescription>
                                                {formatRupiah(data.biaya)}
                                            </CardDescription>
                                            <CardTitle>
                                                Di Bayar
                                            </CardTitle>
                                            <CardDescription>
                                                {formatRupiah(data.bayar)}
                                            </CardDescription>
                                            <CardTitle>
                                                Sisa Bayar
                                            </CardTitle>
                                            <CardDescription>
                                                {formatRupiah(data.sisa_bayar)}
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                Bukti Bayar
                                            </CardTitle>
                                            <CardDescription>
                                                <PhotoProvider>
                                                    <div className="foo">
                                                        <PhotoView src={data.bukti_bayar}>
                                                            <img src={data.bukti_bayar} alt="" />
                                                        </PhotoView>
                                                    </div>
                                                </PhotoProvider>
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                    <div>
                                        <Label>Tolak Pembayaran?</Label>
                                        <Select defaultValue={data.is_rejected ? "true" : "false"} onValueChange={(value) => setData('is_rejected', value === "true")}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Ingin Verifikasi Pembayaran?" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="true">Ya</SelectItem>
                                                <SelectItem value="false">Tidak</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className={cn('', { 'hidden': data.is_rejected })}>
                                        <Label>Verifikasi Pembayaran?</Label>
                                        <Select defaultValue={data.is_verified ? "true" : "false"} onValueChange={(value) => setData('is_verified', value === "true")}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Ingin Verifikasi Pembayaran?" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="true">Ya</SelectItem>
                                                <SelectItem value="false">Tidak</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button type={'submit'}>
                                        Submit
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