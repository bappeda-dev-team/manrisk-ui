'use client'

import { useState, useEffect, useCallback } from "react";
import { useBrandingContext } from "@/components/context/BrandingContext";
import { AlertNotification } from "@/components/global/alert/sweetAlert2";

interface DataValue {
    id: number;
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
    existing_control: string;
    jenis_perlakuan_risiko: string;
    rencana_perlakuan_risiko: string;
    biaya_perlakuan_risiko: string;
    target_waktu: string;
    pic: string;
    status: string;
    keterangan: string;
}
interface OperasionalDaerah {
    kode_opd: string;
    nama_opd: string;
}

interface PenangananFormValue {
    id_rencana_kinerja: string;
    existing_control?: string;
    jenis_perlakuan_risiko?: string;
    rencana_perlakuan_risiko?: string;
    biaya_perlakuan_risiko?: string;
    target_waktu?: string;
    pic?: string;
    pembuat: {
        nama: string;
        nip: string;
        golongan: string;
    }
}

interface PenangananPostResponse {
    message: string;
}

export function getPenangananAll(nip: string, fetchTrigger: boolean = false) {

    const [Loading, setLoading] = useState<boolean>(false);
    const [Error, setError] = useState<boolean>(false);
    const [Penanganan, setPenanganan] = useState<DataValue[]>([]);

    const { branding } = useBrandingContext();
    const tahun = branding.tahun ? branding?.tahun.value : 0;
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
                const response = await fetch(`${API_URL}/penanganan/get-all-data/${nip}/${tahun}`);
                const data = await response.json();
                if (!response.ok) {
                    console.log("error dengan response !ok");
                    setPenanganan([]);
                } else {
                    setPenanganan(data.data);
                    // console.log(data.data);
                }
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        if (tahun != 0 || tahun != undefined || fetchTrigger) {
            getListData();
        } else {
            // Reset state jika kondisi tidak terpenuhi
            setPenanganan([]);
            setLoading(false);
            setError(false);
        }
    }, [nip, tahun, API_URL, fetchTrigger]);

    return (
        { Penanganan, Loading, Error }
    )
}

export function postPenanganan<TRequest = PenangananFormValue, TResponse = PenangananPostResponse>(
    urlPath: string, jenis: string // Endpoint API, misal '/analisa'
): [
        (data: TRequest) => Promise<boolean>, // Fungsi pemicu yang mengembalikan Promise<boolean> (sukses/gagal)
        {
            data: TResponse | null;
            proses: boolean;
            error: boolean;
            message: string | null;
        }
    ] {
    const [data, setData] = useState<TResponse | null>(null);
    const [proses, setProses] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const triggerPost = useCallback(
        async (formValue: TRequest): Promise<boolean> => {
            if (!API_URL) {
                console.error('API URL is not defined. Please set NEXT_PUBLIC_API_URL or configure rewrites.');
                setError(true);
                setMessage('API URL is not configured.');
                return false; // Menandakan kegagalan
            }

            setProses(true); // Mulai proses loading
            setError(false); // Reset error
            setMessage(null); // Reset pesan

            try {
                const response = await fetch(`${API_URL}${urlPath}`, {
                    method: jenis === "baru" ? 'POST' : "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formValue),
                });

                const result = await response.json();

                if (response.ok) {
                    setData(result);
                    // console.log(result);
                    setMessage(result.message || 'Berhasil menyimpan data.');
                    return true; // Menandakan keberhasilan
                } else {
                    setError(true);
                    console.log(result);
                    setMessage(result.message || 'Gagal menyimpan data.');
                    setData(null);
                    return false; // Menandakan kegagalan
                }
            } catch (err) {
                console.error('error:', err);
                setError(true);
                setMessage('Gagal: cek koneksi internet/terdapat kesalahan pada database server.');
                setData(null);
                return false; // Menandakan kegagalan
            } finally {
                setProses(false);
            }
        },
        [API_URL, urlPath]
    );

    return [triggerPost, { data, proses, error, message }];
}