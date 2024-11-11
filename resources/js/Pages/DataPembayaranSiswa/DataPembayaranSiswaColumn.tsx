import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DataPembayaranSiswaAction from "./DataPembayaranSiswaAction";

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

export type ItemDataPembayaranSiswa = {
    pembayaran_id: number;
    nama_item: string;
    user_name: string;
    tahun_ajaran: string;
    biaya: number;
    bayar: number;
    sisa_bayar: number;
    bukti_bayar: string;
    status_pembayaran: string;
    is_verified: boolean;
    created_at: string;
};

export const columns: ColumnDef<ItemDataPembayaranSiswa>[] = [
    {
        accessorKey: "pembayaran_id",
        header: ({ column }) => {
            return;
        },
        cell: ({ row }) => {
            return;
        }
    },
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
        cell: ({ row }) => {
            return row.getValue('nama_item');
        }
    },
    {
        accessorKey: "user_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Siswa
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
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
        accessorKey: "biaya",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total
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
        accessorKey: "sisa_bayar",
        header: ({ column }) => {
            return;
        },
        cell: ({ row }) => {
            return;
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
                    <AvatarImage src={row.getValue('bukti_bayar')} />
                    <AvatarFallback className={'rounded-lg'}>PP</AvatarFallback>
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
            return row.getValue('status_pembayaran') == "lunas" ? <Badge variant={"outline"}>Lunas</Badge> : <Badge variant={"destructive"}>Diangsur</Badge>;
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
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DataPembayaranSiswaAction row={row} />
            );
        },
    },
];
