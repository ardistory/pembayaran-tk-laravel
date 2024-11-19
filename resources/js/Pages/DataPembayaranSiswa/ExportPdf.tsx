import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

function exportToPdf(data: any) {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("Laporan Pembayaran SPP", 14, 15);

    doc.setFontSize(12);
    doc.text("Nama Tagihan: SPP", 14, 25);

    const tableColumn = ["No", "NIS", "Nama Siswa", "Total", "Bayar", "Tanggal"];
    const tableRows = [];

    data.forEach((item, index) => {
        const rowData = [
            index + 1,
            item.nis,
            item.user_name,
            item.biaya.toLocaleString(),
            item.bayar.toLocaleString(),
            new Date(item.created_at).toLocaleDateString("id-ID"),
        ];
        tableRows.push(rowData);
    });

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        theme: "grid",
        headStyles: { fillColor: [155, 155, 0] },
    });

    doc.setFontSize(12);
    doc.text("Cilegon,", 14, doc.previousAutoTable.finalY + 20);

    doc.save("Laporan_Pembayaran_SPP.pdf");
}

export default function ExportPdf({ data }) {
    return (
        <Button onClick={() => exportToPdf(data)} className={'bg-red-600 hover:bg-red-500'}>
            <FileText />
            Export PDF
        </Button>
    );
}