import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DataSiswaAction from "./DataSiswaAction";

export type ItemDataSiswa = {
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
    created_at: string;
    updated_at: string;
};

export const columns: ColumnDef<ItemDataSiswa>[] = [
    {
        accessorKey: "nis",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nis
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
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
        accessorKey: "username",
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
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Jenis Kelamin
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "kelas",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Kelas
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
        accessorKey: "tahun_ajaran",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Tahun Ajaran
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
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
        accessorKey: "no_telepon",
        header: ({ column }) => {
            return;
        },
        cell: ({ row }) => {
            return;
        }
    },
    {
        accessorKey: "created_at",
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
                <DataSiswaAction row={row} />
            );
        },
    },
];
