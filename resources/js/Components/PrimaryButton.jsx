export default function PrimaryButton({ children, icon, ...props }) {
    return (
        <button {...props} className={'flex items-center gap-1 bg-blue-500 text-white hover:bg-blue-400 transition-all duration-200 px-3 py-1 rounded-lg'}>
            {children}
            {icon ? icon : ''}
        </button>
    );
}