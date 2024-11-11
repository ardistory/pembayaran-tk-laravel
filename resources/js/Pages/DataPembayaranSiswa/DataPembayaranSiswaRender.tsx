import { ItemDataPembayaranSiswa, columns } from "./DataPembayaranSiswaColumn";
import { DataTable } from "./DataTable";

interface DataPembayaranSiswaRenderProps {
    data: ItemDataPembayaranSiswa[];
}

export default function DataPembayaranSiswaRender({ data }: DataPembayaranSiswaRenderProps) {
    return (
        <DataTable columns={columns} data={data} />
    );
}