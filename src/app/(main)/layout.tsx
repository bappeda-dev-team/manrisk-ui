'use client'

import { User } from '@/app/types';
import Login from '@/components/Login';
import Logout from '@/components/Logout';
import { BrandingProvider, useBrandingContext } from "@/components/context/BrandingContext";
import { Header } from "@/components/global/header";
import ToastProvider from "@/components/global/provider/toast";
import { TahunNull } from "@/components/page/Error";
import { authenticate } from '@/lib/auth';
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { useEffect, useState } from 'react';
import "../globals.css";

const font = Poppins({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800'],
    display: 'swap', // Mengatur tampilan swap agar tidak ada flash saat font dimuat
});


export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [user, setUser] = useState<User | null>(null);
    const { branding } = useBrandingContext();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await authenticate();
                setUser(res);
            } catch (err) {
                console.error('Autentikasi gagal', err);
            }
        };
        fetchUser();
    }, []);
    return (
        <>
            <BrandingProvider>
                <NextTopLoader
                    color="red"
                    showSpinner={false}
                />
                {user ?
                    (
                        <header>
                            <Logout />
                            <Header />
                        </header>
                    )
                    :
                    (
                        <header>
                            <Login />
                        </header>
                    )
                }
                {(branding?.tahun?.value === null || branding?.tahun?.value === undefined) ?
                    <TahunNull />
                    :
                    <div className="pt-[90px] px-5 pb-5">
                        {children}
                        <ToastProvider />
                    </div>
                }
            </BrandingProvider>
        </>
    );
}
