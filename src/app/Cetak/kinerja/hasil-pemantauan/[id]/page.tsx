'use client'

import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import Kertas from './kertas';
import { useBrandingContext } from '@/components/context/BrandingContext';
import { ApiUrlProvider, useApiUrlContext } from '@/components/context/ApiUrlContext';
import { ApiResponse, IdentifikasiFraudValue } from "@/app/types";
import { useGet } from '@/hook/useGet';

const PDFViewer = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
    {
        ssr: false, // Ini yang paling penting: nonaktifkan Server-Side Rendering
        loading: () => <p className='text-center'>Loading PDF...</p>, // Opsional: tampilkan loading state
    }
);

function MyPDFPage() {

    const [Proses, setProses] = useState<boolean>(true);
    const { branding } = useBrandingContext();
    const tahun = branding?.tahun?.value ?? 0;
    const {url_manrisk} = useApiUrlContext();

    const { Data: HasilData, Loading, Error } = useGet<ApiResponse<IdentifikasiFraudValue[]>>({
        url: `${url_manrisk}/identifikasi/get-all-data/${branding.nip}/${tahun}`
    });
    const Identifikasi = HasilData?.data ?? [];

    if (Proses) {
        return (
            <p>LOADING FETCH DATA...</p>
        )
    }

    return (
        <div style={{ width: '100%', height: '100vh' }}> {/* Pastikan ada tinggi */}
            <PDFViewer width="100%" height="100%">
                <Kertas branding={branding} />
            </PDFViewer>
        </div>
    );
}

export default MyPDFPage;