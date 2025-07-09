import { Poppins } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { BrandingProvider } from "@/components/context/BrandingContext";
import { ApiUrlProvider } from "@/components/context/ApiUrlContext";

const font = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});
// const font = Poppins({
//   subsets: ['latin'],
//   weight: ['200', '300', '400', '500', '600', '700', '800'],
//   display: 'swap',
// });

const logo = process.env.NEXT_PUBLIC_LOGO_URL;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Manrisk - Manajemen Risiko</title>
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
          <ApiUrlProvider>
            <div>
              {children}
            </div>
          </ApiUrlProvider>
        </BrandingProvider>
      </body>
    </html>
  );
}
