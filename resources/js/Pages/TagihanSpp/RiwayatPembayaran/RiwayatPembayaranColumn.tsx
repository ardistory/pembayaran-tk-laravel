import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

function formatDate(string: string) {
    return new Date(string).toISOString().split('T')[0];
}

function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

export type ItemRiwayatPembayaran = {
    nama_item: string;
    biaya: number;
    bayar: number;
    bukti_bayar: string;
    status_pembayaran: string;
    created_at: string;
};

export const columns: ColumnDef<ItemRiwayatPembayaran>[] = [
    {
        accessorKey: "nama_item",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nama Item
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "biaya",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Biaya
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return formatRupiah(row.getValue('biaya'));
        }
    },
    {
        accessorKey: "bayar",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Bayar
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return formatRupiah(row.getValue('bayar'));
        }
    },
    {
        accessorKey: "bukti_bayar",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Bukti Bayar
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <Avatar className={'rounded-lg'}>
                    <AvatarImage className={'rounded-lg'} src={row.getValue('bukti_bayar')} />
                </Avatar>
            );
        }
    },
    {
        accessorKey: "status_pembayaran",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return row.getValue('status_pembayaran') == 'lunas' ? (<Badge>Lunas</Badge>) : (<Badge className={'bg-red-500'}>Diangsur</Badge>);
        }
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Tanggal
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return formatDate(row.getValue('created_at'));
        }
    },
];
