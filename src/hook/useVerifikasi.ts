'use client'

import { useState, useCallback } from "react";
import { VerifikasiFormValue } from "@/app/types";

export function useVerifikasi<TRequest = VerifikasiFormValue, TResponse = {message: string}>(
    url: string // Endpoint API, misal '/analisa'
): [
        (id: string, data: TRequest) => Promise<boolean>, // Fungsi pemicu yang mengembalikan Promise<boolean> (sukses/gagal)
        {
            error: boolean;
            proses: boolean;
            message: string | null;
        }
    ] {
    const [proses, setProses] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const triggerVerifikasi = useCallback(
        async (id: string, formValue: TRequest): Promise<boolean> => {
            if (!API_URL) {
                console.error('API URL is not defined. Please set NEXT_PUBLIC_API_URL or configure rewrites.');
                setError(true);
                setMessage('API URL is not configured.');
                return false; // Menandakan kegagalan
            }

            setProses(true); // Mulai proses loading
            setError(false); // Reset error
            setMessage(null); // Reset pesan

            // console.log(formValue);

            try {
                const response = await fetch(`${API_URL}/${url}/${id}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                    },
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
        [API_URL, url]
    );

    return [triggerVerifikasi, { proses, error, message }];
}