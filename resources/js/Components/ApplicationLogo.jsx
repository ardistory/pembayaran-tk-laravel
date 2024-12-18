import Logo from '@/Assets/img/logo.png';

export default function ApplicationLogo({ className = 'w-10 h-10' }) {
    return (
        <img src={Logo} className={className} />
    );
}
