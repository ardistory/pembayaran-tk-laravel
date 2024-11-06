import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { useForm } from '@inertiajs/react';
import { UserRoundPlus } from 'lucide-react';
import { useEffect } from 'react';

export default function DataPenggunaAdd() {
    const { data, setData, patch, wasSuccessful, reset } = useForm({
        nis: '',
        name: '',
        username: '',
        password: '',
        is_admin: false,
    });

    function handleSubmit(e) {
        e.preventDefault();

        patch(route('data-pengguna'));

        reset(['nis', 'name', 'username', 'password']);
    }

    useEffect(() => {
        if (wasSuccessful) {
            toast({ description: 'Tersimpan' });
        }
    }, [wasSuccessful]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <UserRoundPlus />
                    Tambah Pengguna
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tambah Pengguna</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="password" className="text-right">
                            Apakah Admin?
                        </Label>
                        <Select defaultValue={data.is_admin ? "true" : "false"} onValueChange={value => setData('is_admin', value === "true")}>
                            <SelectTrigger>
                                <SelectValue placeholder="Apakah Admin?" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={"true"}>Ya</SelectItem>
                                <SelectItem value={"false"}>Tidak</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {data.is_admin ? ('') : (
                        <div>
                            <Label htmlFor="nis" className="text-right">
                                Nis
                            </Label>
                            <Input value={data.nis} onChange={e => setData('nis', e.target.value)} id="nis" className="col-span-3" />
                        </div>
                    )}
                    <div>
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input value={data.name} onChange={e => setData('name', e.target.value)} id="name" className="col-span-3" />
                    </div>
                    <div>
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input value={data.username} onChange={e => setData('username', e.target.value)} id="username" className="col-span-3" />
                    </div>
                    <div>
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <Input value={data.password} onChange={e => setData('password', e.target.value)} type={'password'} id="password" className="col-span-3" />
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </DialogContent>
        </Dialog >
    );
}