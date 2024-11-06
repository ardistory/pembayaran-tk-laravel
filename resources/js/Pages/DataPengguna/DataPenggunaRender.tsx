import { ItemDataPengguna, columns } from "./DataPenggunaColumn";
import { DataTable } from "./DataTable";

interface DataPenggunaRenderProps {
    data: ItemDataPengguna[];
}

export default function DataPenggunaRender({ data }: DataPenggunaRenderProps) {
    return (
        <DataTable columns={columns} data={data} />
    );
}