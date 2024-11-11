import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DataTagihanSppRender from './DataTagihanSppRender';

export default function DataTagihanSpp({ pembayaranDetails }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Data Tagihan SPP</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTagihanSppRender data={pembayaranDetails} />
            </CardContent>
        </Card>
    );
}