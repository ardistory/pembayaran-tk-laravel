export default function CustButton({ children, icon, ...props }) {
    return (
        <button {...props} className={'flex items-center gap-1 bg-blue-500 hover:shadow-xl shadow-blue-500 hover:shadow-blue-500 transition-all duration-200 px-3 py-1 rounded-lg'}>
            {children}
            {icon ? icon : ''}
        </button>
    );
}