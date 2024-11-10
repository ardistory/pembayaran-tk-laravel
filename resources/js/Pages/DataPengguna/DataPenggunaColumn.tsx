import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DataPenggunaAction from "./DataPenggunaAction";

export type ItemDataPengguna = {
    id: number;
    nis: string;
    name: string;
    username: string;
    foto: string;
    tahun_ajaran: string;
    jenis_kelamin: string;
    kelas: string;
    tanggal_lahir: string;
    alamat: string;
    no_telepon: string;
    is_verified: boolean;
    is_siswa: boolean;
    tanggal_masuk: string;
    updated_at: string;
};

export const columns: ColumnDef<ItemDataPengguna>[] = [
    {
        accessorKey: "nis",
        header: ({ column }) => {
            return;
        },
        cell: ({ row }) => {
            return;
        }
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nama
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "is_admin",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Level
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return row.getValue('is_admin') ? 'Admin' : 'Pengguna';
        }
    },
    {
        accessorKey: "username",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Username
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        }
    },
    {
        accessorKey: "no_telepon",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nomor Telepon
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "foto",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Foto
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <Avatar className={'rounded-lg'}>
                    <AvatarImage src={row.getValue('foto')} />
                    <AvatarFallback className={'rounded-lg'}>PP</AvatarFallback>
                </Avatar>
            );
        }
    },
    {
        accessorKey: "is_verified",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Verifikasi
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return row.getValue('is_verified') ? <Badge variant={"outline"}>Verifikasi</Badge> : <Badge variant={"destructive"}>Belum</Badge>;
        }
    },
    {
        accessorKey: "id",
        header: ({ column }) => {
            return;
        },
        cell: ({ row }) => {
            return;
        }
    },
    {
        accessorKey: "tanggal_lahir",
        header: ({ column }) => {
            return;
        },
        cell: ({ row }) => {
            return;
        }
    },
    {
        accessorKey: "alamat",
        header: ({ column }) => {
            return;
        },
        cell: ({ row }) => {
            return;
        }
    },
    {
        accessorKey: "tanggal_masuk",
        header: ({ column }) => {
            return;
        },
        cell: ({ row }) => {
            return;
        }
    },
    {
        accessorKey: "kelas",
        header: ({ column }) => {
            return;
        },
        cell: ({ row }) => {
            return;
        }
    },
    {
        accessorKey: "tahun_ajaran",
        header: ({ column }) => {
            return;
        },
        cell: ({ row }) => {
            return;
        }
    },
    {
        accessorKey: "jenis_kelamin",
        header: ({ column }) => {
            return;
        },
        cell: ({ row }) => {
            return;
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DataPenggunaAction row={row} />
            );
        },
    },
];
