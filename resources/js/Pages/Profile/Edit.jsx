import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import HeadLayout from '@/components/HeadLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Edit({ mustVerifyEmail, status, auth }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <HeadLayout title="Profile" />

            <div className="mx-auto max-w-7xl space-y-5 mb-5">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Perbarui informasi profil akun Anda.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} className="max-w-xl" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Update Password</CardTitle>
                        <CardDescription>Pastikan akun Anda menggunakan kata sandi yang panjang dan acak agar tetap aman.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <UpdatePasswordForm className="max-w-xl" />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
