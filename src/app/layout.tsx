import { Poppins } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { BrandingProvider } from "@/components/context/BrandingContext";

const font = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap', // Mengatur tampilan swap agar tidak ada flash saat font dimuat
});

const logo = process.env.NEXT_PUBLIC_LOGO_URL;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Manajemen Resiko</title>
        <meta name="description" content="Aplikasi KAK - Manrisk" />
        <link
          rel="icon"
          href={logo}
        />
      </head>
      <body
        className={`${font.className} antialiased`}
      >
        <BrandingProvider>
          <NextTopLoader
            color="red"
            showSpinner={false}
          />
          <div>
            {children}
          </div>
        </BrandingProvider>
      </body>
    </html>
  );
}
