'use client'

import dynamic from 'next/dynamic';
import React from 'react';
import Kertas from './kertas';
import { useBrandingContext } from '@/components/context/BrandingContext';

const PDFViewer = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
    {
        ssr: false, // Ini yang paling penting: nonaktifkan Server-Side Rendering
        loading: () => <p className='text-center'>Loading PDF...</p>, // Opsional: tampilkan loading state
    }
);

function MyPDFPage() {

    const { branding } = useBrandingContext();
    return (
        <div style={{ width: '100%', height: '100vh' }}> {/* Pastikan ada tinggi */}
            <PDFViewer width="100%" height="100%">
                <Kertas branding={branding} />
            </PDFViewer>
        </div>
    );
}

export default MyPDFPage;