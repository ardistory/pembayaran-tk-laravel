import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import DataSiswaEdit from "./DataSiswaEdit";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type ItemDataSiswa = {
    id: number;
    nis: string;
    name: string;
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
        id: "actions",
        cell: ({ row }) => {
            return (
                <DataSiswaEdit row={row} />
            );
        },
    },
];
