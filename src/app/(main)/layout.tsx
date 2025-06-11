import { Poppins } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/global/header";
import NextTopLoader from "nextjs-toploader";
import ToastProvider from "@/components/global/provider/toast";
import { BrandingProvider } from "@/components/context/BrandingContext";

const font = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap', // Mengatur tampilan swap agar tidak ada flash saat font dimuat
});

const logo = process.env.NEXT_PUBLIC_LOGO_URL;

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        <BrandingProvider>
          <NextTopLoader
            color="red"
            showSpinner={false}
          />
          <header>
            <Header />
          </header>
          <div className="pt-[90px] px-5 pb-5">
            {children}
            <ToastProvider />
          </div>
        </BrandingProvider>
      </>
  );
}
