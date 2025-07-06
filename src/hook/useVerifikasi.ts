'use client'

import { useState, useCallback } from "react";
import { VerifikasiFormValue } from "@/app/types";
import { useApiUrlContext } from "@/components/context/ApiUrlContext";

export function useVerifikasi<TRequest = VerifikasiFormValue, TResponse = { message: string }>(
    url: string // Endpoint API, misal '/analisa'
): [
        (id: string, data: TRequest) => Promise<boolean>, // Fungsi pemicu yang mengembalikan Promise<boolean> (sukses/gagal)
        {
            error: boolean;
            proses: boolean;
            message: string | null;
        }
    ] {
    const { url_manrisk, token } = useApiUrlContext();
    const [proses, setProses] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);

    const USERNAME_API = process.env.NEXT_PUBLIC_USERNAME_API || "-";
    const PASS_API = process.env.NEXT_PUBLIC_PASSWORD_API || "-";

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
    }
    const credentials = btoa(`${USERNAME_API}:${PASS_API}`);

    // Tambahkan header Authorization ke objek headers Anda
    const headersWithAuth = {
        ...headers, // Pastikan Anda menyertakan headers lain yang mungkin sudah ada
        'Authorization': `Basic ${credentials}`
    };

    const triggerVerifikasi = useCallback(
        async (id: string, formValue: TRequest): Promise<boolean> => {
            if (!url_manrisk) {
                console.error('API URL is not defined. Please set NEXT_PUBLIC_url_manrisk or configure rewrites.');
                setError(true);
                setMessage('API URL is not configured.');
                return false; // Menandakan kegagalan
            }

            setProses(true); // Mulai proses loading
            setError(false); // Reset error
            setMessage(null); // Reset pesan

            // console.log(formValue);
            // console.log(headersWithAuth);

            try {
                const response = await fetch(`${url_manrisk}/${url}/${id}`, {
                    method: "PATCH",
                    headers: headersWithAuth,
                    body: JSON.stringify(formValue),
                });

                const result = await response.json();

                if (result.success) {
                    // console.log(result);
                    setMessage('Berhasil Verifikasi Data.');
                    return true; // Menandakan keberhasilan
                } else {
                    setError(true);
                    console.log(result);
                    setMessage(result.data || 'Gagal Verifikasi.');
                    return false; // Menandakan kegagalan
                }
            } catch (err) {
                console.error('error:', err);
                setError(true);
                setMessage('Gagal: cek koneksi internet/terdapat kesalahan pada database server.');
                return false; // Menandakan kegagalan
            } finally {
                setProses(false);
            }
        },
        [url_manrisk, url]
    );

    return [triggerVerifikasi, { proses, error, message }];
}