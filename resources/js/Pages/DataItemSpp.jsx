import HeadLayout from '@/Components/HeadLayout';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import DataItemSppRender from './DataItemSpp/DataItemSppRender';

export default function DataItemSpp({ auth, itemSpp }) {
    return (
        <>
            <HeadLayout title={'Data Item SPP'} />

            <AuthenticatedLayout auth={auth}>
                <DataItemSppRender data={itemSpp} />
            </AuthenticatedLayout >
        </>
    );
}