import { useState, useCallback } from "react";
import { UsePostResponse } from "@/app/types";
import { useApiUrlContext } from "@/components/context/ApiUrlContext";

export const usePost = <T, TResponse = { message: string }>(urlPath: string, jenis: string): [
    (formValue: T) => Promise<boolean>, // Fungsi untuk memicu POST/PUT
    UsePostResponse<TResponse> // Objek state yang dikembalikan
] => {
    const [data, setData] = useState<TResponse | null>(null);
    const [proses, setProses] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
    const { url_manrisk, token } = useApiUrlContext();
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

    const triggerPost = useCallback(
        async (formValue: T): Promise<boolean> => {
            if (!url_manrisk) {
                console.error('API is not defined. Please set NEXT_PUBLIC_API_MANRISK or configure rewrites.');
                setError(true);
                setMessage('API is not configured.');
                return false; // Menandakan kegagalan
            }

            setProses(true); // Mulai proses loading
            setError(false); // Reset error
            setMessage(null); // Reset pesan

            try {
                const response = await fetch(`${url_manrisk}${urlPath}`, {
                    method: jenis === "baru" ? 'POST' : "PUT",
                    headers: headersWithAuth,
                    body: JSON.stringify(formValue),
                });

                const result = await response.json();

                if (response.ok) {
                    setData(result);
                    // console.log("post berhasil: ", result);
                    setMessage(result.message || 'Berhasil menyimpan data.');
                    return true; // Menandakan keberhasilan
                } else {
                    setError(true);
                    // console.log(result);
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
        [url_manrisk, urlPath]
    );

    return [triggerPost, { data, proses, error, message }];
}
