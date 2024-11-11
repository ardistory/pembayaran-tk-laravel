import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, Hourglass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

type Pembayaran = {
    biaya: number;
    bayar: number;
    sisa_bayar: number;
    status_pembayaran: string;
    is_verified: boolean;
    created_at: string;
};

export type ItemDataTagihanSpp = {
    nama_item: string;
    biaya: number;
    pembayaran: Pembayaran[];
};

export const columns: ColumnDef<ItemDataTagihanSpp>[] = [
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
        accessorKey: "pembayaran",
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
            const pembayaran = row.getValue('pembayaran');
            return pembayaran.map((payment: any, index: number) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle>
                            Di Bayar
                        </CardTitle>
                        <CardDescription>
                            {formatRupiah(payment.bayar)}
                        </CardDescription>
                        <CardTitle>
                            Sisa Bayar
                        </CardTitle>
                        <CardDescription>
                            {formatRupiah(payment.sisa_bayar)}
                        </CardDescription>
                        <CardTitle>
                            Status
                        </CardTitle>
                        <CardDescription>
                            {payment.status_pembayaran == 'lunas' ? <Badge className={'inline-flex items-center gap-2'}>Lunas<Check size={10} /></Badge> : <Badge className={'inline-flex items-center gap-2'}>Diangsur<Hourglass size={10} /></Badge>}
                        </CardDescription>
                    </CardHeader>
                </Card>
            ));
        }
    },
];
