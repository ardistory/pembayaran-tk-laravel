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
import { useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export default function TotalTagihanSpp({ auth, itemSpp, pembayaranUser }) {
    const { setData, post, reset, recentlySuccessful } = useForm({
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
            preserveScroll: true
        });

        reset('kd_spp', 'bayar', 'bukti_bayar');
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
                            <CardTitle>
                                Total
                            </CardTitle>
                            <CardDescription>
                                <span>Rp.2.400.000</span>
                            </CardDescription>
                            <CardTitle>
                                Sudah Bayar
                            </CardTitle>
                            <CardDescription>
                                <span>Rp.150.000</span>
                            </CardDescription>
                            <CardTitle>
                                Sisa Tagihan
                            </CardTitle>
                            <CardDescription>
                                <span>Rp.2.250.000</span>
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>Bayar SPP</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Bayar SPP</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid gap-4 py-4">
                                            <div>
                                                <Label htmlFor="item_spp" className="text-right">
                                                    Item SPP
                                                </Label>
                                                <Select id={'item_spp'} onValueChange={value => setData('kd_spp', value)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Item SPP" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup className={'max-h-52'}>
                                                            <SelectLabel>Item SPP</SelectLabel>
                                                            {itemSpp.map(spp => {
                                                                const pembayaran = pembayaranUser.find(p => p.item_spp_kd_spp === spp.kd_spp);
                                                                const sisa = pembayaran ? pembayaran.sisa_bayar : 'Belum Di Bayar';

                                                                return (
                                                                    <SelectItem key={spp.kd_spp} value={spp.kd_spp}>{spp.nama_item} - {formatRupiah(spp.biaya)} - {(sisa === 0) ? 'Lunas' : (sisa === 'Belum Di Bayar') ? 'Belum Di Bayar' : 'Sisa: ' + formatRupiah(sisa)}</SelectItem>
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
                                                            <InputOTPSlot index={0} />
                                                            <InputOTPSlot index={1} />
                                                            <InputOTPSlot index={2} />
                                                            <InputOTPSlot index={3} />
                                                            <InputOTPSlot index={4} />
                                                            <InputOTPSlot index={5} />
                                                        </InputOTPGroup>
                                                    </InputOTP>
                                                </div>
                                            </div>
                                            <div>
                                                <Label htmlFor="bukti_bayar" className="text-right">
                                                    Bukti Pembayaran
                                                </Label>
                                                <Input onChange={e => setData('bukti_bayar', e.target.files[0])} type={'file'} id="bukti_bayar" className="col-span-3" />
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