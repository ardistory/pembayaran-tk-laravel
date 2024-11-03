import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Button } from '@/components/ui/button';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            nis: user.nis,
            username: user.username,
            no_telepon: user.no_telepon || ''
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-white">
                    Perbarui informasi profil akun Anda.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="nis" value="Nis" className={'text-black dark:text-white'} />

                    <TextInput
                        id="nis"
                        className="mt-1 block w-full"
                        value={data.nis}
                        name={'nis'}
                        onChange={(e) => setData('nis', e.target.value)}
                        required
                        isFocused
                        autoComplete="nis"
                    />

                    <InputError className="mt-2" message={errors.nis} />
                </div>

                <div>
                    <InputLabel htmlFor="username" value="Username" className={'text-black dark:text-white'} />

                    <TextInput
                        disabled={true}
                        id="username"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.username}
                        name={'username'}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.username} />
                </div>

                <div>
                    <InputLabel htmlFor="no_telepon" value="Nomor Telepon" className={'text-black dark:text-white'} />

                    <TextInput
                        id="no_telepon"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.no_telepon}
                        name={'no_telepon'}
                        onChange={(e) => setData('no_telepon', e.target.value)}
                        required
                        autoComplete="no_telepon"
                    />

                    <InputError className="mt-2" message={errors.no_telepon} />
                </div>

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Save</Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-white">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
