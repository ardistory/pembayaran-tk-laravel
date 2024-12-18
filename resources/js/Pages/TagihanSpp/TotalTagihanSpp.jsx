import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from '@inertiajs/react';
import { Terminal } from "lucide-react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

export default function TotalTagihanSpp({ auth, itemSpp, pembayaranUser, totalBiaya, sudahBayar, sisaTagihan }) {
    const inputBuktiBayar = useRef();

    const { data, setData, post, recentlySuccessful } = useForm({
        username: auth.user.username,
        kd_spp: '',
        bayar: 0,
        bukti_bayar: null,
    });

    function formatRupiah(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    }

    function handleSubmit(e) {
        e.preventDefault();

        post(route('tagihan-spp'), {
            preserveScroll: true,
            onSuccess: () => {
                inputBuktiBayar.current.value = '';
                setData('bayar', 0);
                window.location.reload();
            }
        });

    }

    useEffect(() => {
        if (recentlySuccessful) {
            toast({ description: 'Input berhasil menunggu verifikasi' });
        }
    }, [recentlySuccessful]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Total Tagihan SPP</CardTitle>
            </CardHeader>
            <CardContent>
                {auth.user.is_verified ? (
                    <Card>
                        <CardHeader>
                            <Alert className={'mb-5'}>
                                <Terminal className="h-4 w-4" />
                                <AlertTitle>Informasi</AlertTitle>
                                <AlertDescription>
                                    "Sudah Bayar" dihitung ketika pembayaran sudah diverifikasi Admin
                                </AlertDescription>
                            </Alert>
                            <CardTitle>
                                Total
                            </CardTitle>
                            <CardDescription>
                                <span>{formatRupiah(totalBiaya)}</span>
                            </CardDescription>
                            <CardTitle>
                                Sudah Bayar
                            </CardTitle>
                            <CardDescription>
                                <span>{formatRupiah(sudahBayar)}</span>
                            </CardDescription>
                            <CardTitle>
                                Sisa Tagihan
                            </CardTitle>
                            <CardDescription>
                                <span>{formatRupiah(sisaTagihan)}</span>
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>Bayar SPP</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className={'dark:text-white'}>Bayar SPP</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid gap-4 py-4">
                                            <div>
                                                <Label htmlFor="item_spp" className="text-right dark:text-white">
                                                    Item SPP
                                                </Label>
                                                <Select id={'item_spp'} onValueChange={value => setData('kd_spp', value)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Item SPP" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Item SPP</SelectLabel>
                                                            {itemSpp.map(spp => {
                                                                const pembayaran = pembayaranUser.find(p => p.item_spp_kd_spp === spp.kd_spp);
                                                                const sisa = pembayaran ? pembayaran.sisa_bayar : 'Belum Di Bayar';
                                                                const statusPembayaran = pembayaran
                                                                    ? (sisa === 0
                                                                        ? 'Lunas'
                                                                        : 'Sisa ' + formatRupiah(sisa)
                                                                    ) + (pembayaran.is_verified ? '' : ' - Menunggu Verifikasi Admin')
                                                                    : 'Belum Di Bayar';

                                                                return (
                                                                    <SelectItem key={spp.kd_spp} value={spp.kd_spp}>
                                                                        {spp.nama_item} - {formatRupiah(spp.biaya)} - {statusPembayaran}
                                                                    </SelectItem>
                                                                );
                                                            })}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <Alert>
                                                <Terminal className="h-4 w-4" />
                                                <AlertTitle>Informasi!</AlertTitle>
                                                <AlertDescription>
                                                    Jika jumlah yang dibayarkan kurang dari Item SPP yang dipilih, Item SPP yang kurang akan dinyatakan tidak dibayarkan atau dinyatakan mengangsur Pembayaran Item tertentu.
                                                </AlertDescription>
                                            </Alert>
                                            <div>
                                                <Label htmlFor="jumlah_bayar" className="text-right">
                                                    Jumlah Bayar
                                                </Label>
                                                <div className={'flex items-center'}>
                                                    <span className={'text-xs'}>Rp</span>
                                                    <InputOTP onChange={value => setData('bayar', parseInt(value))} maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot className={'dark:text-white'} index={0} />
                                                            <InputOTPSlot className={'dark:text-white'} index={1} />
                                                            <InputOTPSlot className={'dark:text-white'} index={2} />
                                                            <InputOTPSlot className={'dark:text-white'} index={3} />
                                                            <InputOTPSlot className={'dark:text-white'} index={4} />
                                                            <InputOTPSlot className={'dark:text-white'} index={5} />
                                                        </InputOTPGroup>
                                                    </InputOTP>
                                                </div>
                                            </div>
                                            <div>
                                                <Label htmlFor="bukti_bayar" className="text-right">
                                                    Bukti Pembayaran
                                                </Label>
                                                <Input ref={inputBuktiBayar} onChange={e => setData('bukti_bayar', e.target.files[0])} type={'file'} id="bukti_bayar" className="col-span-3" />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit">Submit</Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </CardFooter>
                    </Card>
                ) : (
                    <>
                        <Alert variant={'destructive'}>
                            <AlertDescription>
                                Harap tunggu konfirmasi dari Admin SIPESED mengenai verifikasi data Siswa Edelweiss yang Anda daftarkan.
                            </AlertDescription>
                        </Alert>
                    </>
                )}
            </CardContent>
        </Card>
    );
}