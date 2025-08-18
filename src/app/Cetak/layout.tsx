import NextTopLoader from 'nextjs-toploader';
import { BrandingProvider } from '@/components/context/BrandingContext';

export default function CetakLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen">
            <NextTopLoader />
            <BrandingProvider>
                <main className="font-serif flex-1 overflow-y-auto">
                    {children}
                </main>
            </BrandingProvider>
        </div>
    );
}