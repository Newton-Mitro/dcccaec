import { Link } from '@inertiajs/react';

export default function AppLogoIcon({ className = '' }: { className?: string }) {
    return (
        <Link href="/" className={`${className} rounded-full bg-white p-2`}>
            <img src="/logo.png" alt="App Logo" />
        </Link>
    );
}
