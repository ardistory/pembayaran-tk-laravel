export default function Card({ title, children, icon }) {
    return (
        <>
            <div className={'shadow-md shadow-black/50 rounded-lg'}>
                <div className={'px-3 py-1 font-semibold border-b text-blue-900 bg-gray-100 w-full text-lg inline-flex items-center justify-start gap-2'}>
                    {icon}
                    {title}
                </div>
                <div className={'px-3 py-3'}>
                    {children}
                </div>
            </div>
        </>
    );
}