import { AlertNotification } from "../alert/sweetAlert2";

export const setCookies = (name: string, value: any) => {
    let cookiesValue: string;
    cookiesValue = JSON.stringify(value);
    document.cookie = `${name}=${cookiesValue}; path=/`;
}
export const getCookies = (name: string): string | null => {
    if (typeof document === 'undefined') {
        // Jika di server-side, kembalikan null atau nilai default lainnya
        return null;
    }

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
};

export const setTahunCookies = (selectedOption: { value: number, label: string }) => {
    setCookies("tahun", selectedOption);
    AlertNotification("Berhasil Mengubah Tahun", `Tahun diubah ke ${selectedOption?.value}`, "success", 2000, true);
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}
export const setOpdCookies = (selectedOption: { value: string, label: string }) => {
    setCookies("opd", selectedOption);
    AlertNotification("Berhasil Mengubah OPD", `Perangkat Daerah diubah ke ${selectedOption?.label}`, "success", 2000, true);
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

export const getOpdTahun = () => {
    const get_tahun = getCookies("tahun");
    const get_opd = getCookies("opd");

    if (get_tahun && get_opd) {
        return {
            tahun: JSON.parse(get_tahun),
            opd: JSON.parse(get_opd)
        };
    }

    if (get_tahun) {
        return { tahun: JSON.parse(get_tahun), opd: null };
    }

    if (get_opd) {
        return { tahun: null, opd: JSON.parse(get_opd) };
    }

    return { tahun: null, opd: null };
};