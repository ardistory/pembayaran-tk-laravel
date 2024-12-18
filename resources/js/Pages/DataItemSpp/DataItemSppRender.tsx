import { ItemSpp, columns } from "./DataItemSppColumn";
import { DataTable } from "./DataTable";

interface DataItemSppRenderProps {
    data: ItemSpp[];
}

export default function DataItemSppRender({ data }: DataItemSppRenderProps) {
    return (
        <DataTable columns={columns} data={data} />
    );
}