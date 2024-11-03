import { ItemDataSiswa, columns } from "./DataSiswaColumn";
import { DataTable } from "./DataTable";

interface DataSiswaRenderProps {
    data: ItemDataSiswa[];
}

export default function DataSiswaRender({ data }: DataSiswaRenderProps) {
    return (
        <DataTable columns={columns} data={data} />
    );
}