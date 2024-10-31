import { Info } from '@phosphor-icons/react';

export default function Alert({ children, variant = 'green', icon = (<Info size={25} />) }) {
    const variants = {
        red: 'bg-red-400 text-white',
        green: 'bg-green-400 text-gray-500'
    };

    return (
        <div className={`flex items-center gap-2 px-2 py-1 rounded ${variants[variant]}`}>
            {icon}
            <div>
                {children}
            </div>
        </div>
    );
}