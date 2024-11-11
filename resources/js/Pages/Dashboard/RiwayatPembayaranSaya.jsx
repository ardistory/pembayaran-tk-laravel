import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function RiwayatPembayaranSaya({ auth }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>RiwayatPembayaranSaya</CardTitle>
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