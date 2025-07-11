import { User } from '@/app/types';

export async function authenticate(): Promise<User> {
    const res = await fetch('https://manrisk.kertaskerja.cc/user', {
        method: 'GET',
        credentials: 'include', // if you use cookies
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error('Failed to authenticate');
    }

    return res.json();
}
