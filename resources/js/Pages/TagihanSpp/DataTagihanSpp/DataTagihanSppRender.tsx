import { ItemDataTagihanSpp, columns } from "./DataTagihanSppColumn";
import { DataTable } from "./DataTable";

interface DataTagihanSppRenderProps {
    data: ItemDataTagihanSpp[];
}

export default function DataTagihanSppRender({ data }: DataTagihanSppRenderProps) {
    return (
        <DataTable columns={columns} data={data} />
    );
}