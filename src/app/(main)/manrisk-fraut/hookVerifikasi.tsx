'use client'

import { useState, useEffect, useCallback } from "react";
import { useBrandingContext } from "@/components/context/BrandingContext";
import { AlertNotification } from "@/components/global/alert/sweetAlert2";

interface VerifikasiFormValue {
    status: string;
    keterangan: string;
    verifikator: {
        nama: string;
        nip: string;
        golongan: string;
    }
}
interface VerifikasiResponse {
    message: string;
}

export function verifikasi<TRequest = VerifikasiFormValue, TResponse = VerifikasiResponse>(
    urlPath: string // Endpoint API, misal '/analisa'
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

    const triggerVerifikasi = useCallback(
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
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formValue),
                });

                const result = await response.json();

                if (response.ok) {
                    setData(result);
                    // console.log(result);
                    setMessage(result.message || 'Berhasil Menambahkan Verifikasi.');
                    return true; // Menandakan keberhasilan
                } else {
                    setError(true);
                    // console.log(result);
                    setMessage(result.message || 'Gagal Verifikasi.');
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

    return [triggerVerifikasi, { data, proses, error, message }];
}