import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from '@/components/ui/button';
import { Sheet } from 'lucide-react';

function formatDate(string) {
    return new Date(string).toLocaleDateString();
}

function exportToExcel(data: any) {
    const worksheetData = [
        ["No", "NIS", "Nama Siswa", "Total", "Bayar", "Tanggal"],
    ];

    data.forEach((item, index) => {
        worksheetData.push([
            index + 1,
            item.nis || "-",
            item.user_name,
            item.biaya,
            item.bayar || 0,
            formatDate(item.created_at) || "-",
        ]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan SPP");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(dataBlob, "Laporan_Pembayaran_SPP.xlsx");
}

export default function ExportExcel({ data }) {
    return (
        <Button onClick={() => exportToExcel(data)} className={'bg-green-600 hover:bg-green-500'}>
            <Sheet />
            Export Excel
        </Button>
    );
}