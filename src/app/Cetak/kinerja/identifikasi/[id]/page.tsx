'use client'

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Kertas from './kertas';
import { LoadingClock } from '@/components/global/loading';
import { useBrandingContext } from '@/components/context/BrandingContext';
import { useApiUrlContext } from '@/components/context/ApiUrlContext';
import { ApiResponse, IdentifikasiFraudValue } from "@/app/types";
import { useGet } from '@/hook/useGet';
import { ErrorMessage } from '@/components/page/Error';
import { FormTanggal } from '@/app/Cetak/FormTanggal';

const PDFViewer = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
    {
        ssr: false, // Ini yang paling penting: nonaktifkan Server-Side Rendering
        loading: () => <p className='text-center'>Loading PDF...</p>, // Opsional: tampilkan loading state
    }
);

function MyPDFPage() {

    const { branding } = useBrandingContext();
    const tahun = branding?.tahun?.value ?? 0;
    const { url_manrisk } = useApiUrlContext();

    const [SiapCetak, setSiapCetak] = useState<boolean>(false);
    const [Tanggal, setTanggal] = useState<string>('');

    const handleSiapCetak = (tanggal: string) => {
        const dateObj = new Date(`${tanggal}T00:00:00`);
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        const TanggalFormatBaru = dateObj.toLocaleDateString('id-ID', options);
        setTanggal(TanggalFormatBaru);
        setSiapCetak(true);
    };

    const { Data: HasilData, Loading, Error } = useGet<ApiResponse<IdentifikasiFraudValue[]>>({
        url: `${url_manrisk}/identifikasi/get-all-data/${branding.nip}/${tahun}`
    });
    const Identifikasi = HasilData?.data ?? [];
    console.log(Identifikasi);

    if (Loading) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl py-10 px-30 h-screen shadow-2xl shadow-gray-400">
                <LoadingClock />
                <p>Mengambil Data Manrisk Fraud Identifikasi</p>
            </div>
        )
    } else if (Error) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl py-10 px-30 h-screen w-screen bg-red-50 shadow-2xl shadow-gray-400">
                <ErrorMessage />
            </div>
        )
    } else if (!SiapCetak) {
        return (
            <FormTanggal
                siapCetak={handleSiapCetak}
            />
        )
    } else if (SiapCetak) {
        return (
            <div style={{ width: '100%', height: '100vh' }}> {/* Pastikan ada tinggi */}
                <PDFViewer width="100%" height="100%">
                    <Kertas branding={branding} data={Identifikasi ?? []} tanggal={Tanggal} />
                </PDFViewer>
            </div>

        );
    }

}

export default MyPDFPage;