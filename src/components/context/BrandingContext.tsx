'use client'

import { createContext, useContext } from "react"
import { useState, useEffect } from "react";
import { getOpdTahun } from "../global/utils/cookies";

interface OptionType {
    label: string;
    value: number;
}
interface OptionTypeString {
    value: string;
    label: string;
}

interface BrandingContextType {
    title: string;
    logo: string;
    url_login: string;
    api_perencanaan: string;
    api_manrisk: string;
    branding: {
        title: string;
        tahun: OptionType | null | undefined;
        opd: OptionTypeString | null | undefined;
        nip: string;
        logo: string;
        url_login: string;
        api_perencanaan: string;
        api_manrisk: string;
    }
}

const appName = process.env.NEXT_PUBLIC_APP_NAME || "";
const logo = process.env.NEXT_PUBLIC_LOGO_URL || "";
const url_login = process.env.NEXT_PUBLIC_LOGIN_URL || "";
const api_perencanaan = process.env.NEXT_PUBLIC_API_PERENCANAAN || "";
const api_manrisk = process.env.NEXT_PUBLIC_API_MANRISK || "";

// context
const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

export function BrandingProvider({ children }: Readonly<{ children: React.ReactNode; }>) {

    const [Tahun, setTahun] = useState<OptionType | null>(null);
    const [SelectedOpd, setSelecetedOpd] = useState<OptionTypeString | null>(null);
    const [Nip, setNip] = useState<string>("");

    useEffect(() => {
        const data = getOpdTahun();
        if (data.opd) {
            const opd = {
                label: data.opd.label,
                value: data.opd.value,
            }
            setSelecetedOpd(opd);
        }
        if (data.tahun) {
            const tahun = {
                label: data.tahun.label,
                value: data.tahun.value,
            }
            setTahun(tahun);
        }
        if (data.nip) {
            setNip(data.nip);
        }
    }, []);

    return (
        <BrandingContext.Provider
            value={{
                title: appName,
                logo: logo,
                url_login: url_login,
                api_perencanaan: api_perencanaan,
                api_manrisk: api_manrisk,
                branding: {
                    title: appName,
                    logo: logo,
                    tahun: Tahun,
                    opd: SelectedOpd,
                    nip: Nip,
                    url_login: url_login,
                    api_perencanaan: api_perencanaan,
                    api_manrisk: api_manrisk,
                }
            }}
        >
            {children}
        </BrandingContext.Provider>
    );
}

export function useBrandingContext() {
    const context = useContext(BrandingContext);
    if (context === undefined) {
        throw new Error("useBrandingContext must be used witihin a BrandingProvider")
    }
    return context;
}
