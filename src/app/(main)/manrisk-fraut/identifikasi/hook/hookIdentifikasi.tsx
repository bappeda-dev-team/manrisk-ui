'use client'

import { useState, useEffect } from "react";
import { useBrandingContext } from "@/components/context/BrandingContext";

interface DataValue {
    id_rencana_kinerja: string;
    id_pohon: number;
    nama_pohon: string;
    level_pohon: number;
    nama_rencana_kinerja: string;
    tahun: string;
    status_rencana_kinerja: string;
    pegawai_id: string;
    nama_pegawai: string;
    operasional_daerah: OperasionalDaerah;
    nama_risiko: string;
    penyebab: string;
    akibat: string;
    skala_dampak: number;
    skala_kemungkinan: number;
    tingkat_risiko: number;
    level_risiko: string;
    status: string;
    keterangan: string;
}
interface OperasionalDaerah {
    kode_opd: string;
    nama_opd: string;
}

export function getIdentifikasiAll(nip: string) {

    const [Loading, setLoading] = useState<boolean>(false);
    const [Error, setError] = useState<boolean>(false);
    const [Identifikasi, setIdentifikasi] = useState<DataValue[]>([]);

    const { branding } = useBrandingContext();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const getListData = async () => {
            if (!API_URL) {
                console.error('API tidak terbaca');
                setError(true);
                return;
            }

            setLoading(true);
            setError(false); // Reset error state on new fetch

            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/identifikasi/get-all-data/${nip}/${branding.tahun ? branding.tahun.value : 0}`);
                const data = await response.json();
                if (!response.ok) {
                    console.log("error dengan response !ok");
                    setIdentifikasi([]);
                } else {
                    setIdentifikasi(data);
                }
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        getListData();
    }, [nip, branding.tahun, API_URL]);

    return (
        { Identifikasi, Loading, Error }
    )
}