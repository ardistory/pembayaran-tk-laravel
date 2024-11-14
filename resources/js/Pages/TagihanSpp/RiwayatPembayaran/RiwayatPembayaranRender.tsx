import { ItemRiwayatPembayaran, columns } from "./RiwayatPembayaranColumn";
import { DataTable } from "./DataTable";

interface RiwayatPembayaranRenderProps {
    data: ItemRiwayatPembayaran[];
}

export default function RiwayatPembayaranRender({ data }: RiwayatPembayaranRenderProps) {
    return (
        <DataTable columns={columns} data={data} />
    );
}