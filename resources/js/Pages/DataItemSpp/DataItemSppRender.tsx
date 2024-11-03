import { ItemSpp, columns } from "./DataItemSppColumn";
import { DataTable } from "@/components/DataTable";

interface DataItemSppRenderProps {
    data: ItemSpp[];
}

export default function DataItemSppRender({ data }: DataItemSppRenderProps) {
    return (
        <DataTable columns={columns} data={data} />
    );
}