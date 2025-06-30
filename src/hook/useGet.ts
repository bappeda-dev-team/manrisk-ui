'use client'

import { useState, useEffect, useCallback } from "react";
import { useBrandingContext } from "@/components/context/BrandingContext";
import { AlertNotification } from "@/components/global/alert/sweetAlert2";
import { FetchResponse } from "@/app/types";

interface useFetchDataProps {
    url: string;
    fetchTrigger: boolean;
}

export const useGet = <T>({ url, fetchTrigger }: useFetchDataProps): FetchResponse<T> => {

    const [Loading, setLoading] = useState<boolean>(false);
    const [Error, setError] = useState<boolean>(false);
    const [Data, setData] = useState<T | undefined>(undefined);

    const { branding } = useBrandingContext();
    const tahun = branding.tahun ? branding?.tahun.value : 0;
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const USERNAME_API = process.env.NEXT_PUBLIC_USERNAME_API || "-";
    const PASS_API = process.env.NEXT_PUBLIC_PASSWORD_API || "-";

    function encodeBasicAuth(username: string, password: string): string {
        const credentials = `${username}:${password}`;
        // Di lingkungan Node.js (Server Components), gunakan Buffer
        if (typeof window === 'undefined') {
            return Buffer.from(credentials).toString('base64');
        }
        // Di lingkungan browser (Client Components), gunakan btoa
        return btoa(credentials);
    }

    const basicToken = encodeBasicAuth(USERNAME_API, PASS_API);

        useEffect(() => {
            const getListData = async () => {
                if (!API_URL) {
                    console.error('API tidak terbaca');
                    setError(true);
                    return;
                } else if(!USERNAME_API){
                    console.error('Username API tidak terbaca');
                    setError(true);
                    return;
                } else if(!PASS_API){
                    console.error('Password API tidak terbaca');
                    setError(true);
                    return;
                }

                setLoading(true);
                setError(false); // Reset error state on new fetch

                try {
                    setLoading(true);
                    const response = await fetch(`${url}`, {
                        headers: {
                            'Content-Type' : "application/json",
                            'Authorization' : `Basic ${basicToken}`
                        }
                    });
                    const data = await response.json();
                    if (!response.ok) {
                        console.log("error dengan response !ok");
                        setData(undefined);
                    } else {
                        setData(data.data);
                        // console.log(data.data);
                    }
                } catch (err) {
                    console.error(err);
                    setError(true);
                } finally {
                    setLoading(false);
                }
            }
            getListData();
        }, [tahun, API_URL, USERNAME_API, PASS_API, fetchTrigger]);

    return (
        { Data, Loading, Error }
    )
}