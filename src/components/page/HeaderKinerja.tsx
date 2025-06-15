'use client'

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LoadingButtonClip } from "../global/loadingButton";
import { TbActivity, TbChartBar, TbFocus, TbTools } from "react-icons/tb";

interface HeaderKinerja {
    jenis: "pemda" | "opd" | "individu";
}

export const HeaderKinerja: React.FC<HeaderKinerja> = ({ jenis }) => {

    const [LoadingHalaman, setLoadingHalaman] = useState<string>('');

    const router = useRouter();
    const url = usePathname();

    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
                className={`flex items-center gap-1 py-1 px-3 border rounded-lg cursor-pointer 
                    ${(
                        url === '/manrisk-kinerja/pemda/identifikasi' ||
                        url === '/manrisk-kinerja/opd/identifikasi' ||
                        url === '/manrisk-kinerja/individu/identifikasi'
                    ) ? "bg-green-500 border-green-500 text-white" : "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"}
                `}
                onClick={() => {
                    if (jenis === 'pemda') {
                        if (url != '/manrisk-kinerja/pemda/identifikasi') {
                            router.push("/manrisk-kinerja/pemda/identifikasi");
                            setLoadingHalaman('identifikasi');
                        } else {
                            setLoadingHalaman('');
                        }
                    }
                    if (jenis === 'opd') {
                        if (url != '/manrisk-kinerja/opd/identifikasi') {
                            router.push("/manrisk-kinerja/opd/identifikasi");
                            setLoadingHalaman('identifikasi');
                        } else {
                            setLoadingHalaman('');
                        }
                    }
                    if (jenis === 'individu') {
                        if (url != '/manrisk-kinerja/individu/identifikasi') {
                            router.push("/manrisk-kinerja/individu/identifikasi");
                            setLoadingHalaman('identifikasi');
                        } else {
                            setLoadingHalaman('');
                        }
                    }
                }}
            >
                {LoadingHalaman === 'identifikasi' ?
                    <LoadingButtonClip />
                    :
                    <TbFocus />
                }
                Identifikasi
            </button>
            <button
                className={`flex items-center gap-1 py-1 px-3 border rounded-lg cursor-pointer 
                    ${(
                        url === '/manrisk-kinerja/pemda/analisa' ||
                        url === '/manrisk-kinerja/opd/analisa' ||
                        url === '/manrisk-kinerja/individu/analisa'
                    ) ? "bg-blue-500 border-blue-500 text-white" : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"}
                `}
                onClick={() => {
                    if(jenis === 'pemda'){
                        if (url != '/manrisk-kinerja/pemda/analisa') {
                            router.push("/manrisk-kinerja/pemda/analisa");
                            setLoadingHalaman('analisa');
                        } else {
                            setLoadingHalaman('');
                        }
                    }
                    if(jenis === 'opd'){
                        if (url != '/manrisk-kinerja/opd/analisa') {
                            router.push("/manrisk-kinerja/opd/analisa");
                            setLoadingHalaman('analisa');
                        } else {
                            setLoadingHalaman('');
                        }
                    }
                    if(jenis === 'individu'){
                        if (url != '/manrisk-kinerja/individu/analisa') {
                            router.push("/manrisk-kinerja/individu/analisa");
                            setLoadingHalaman('analisa');
                        } else {
                            setLoadingHalaman('');
                        }
                    }
                }}
            >
                {LoadingHalaman === 'analisa' ?
                    <LoadingButtonClip />
                    :
                    <TbChartBar />
                }
                Analisa
            </button>
            <button
                className={`flex items-center gap-1 py-1 px-3 border rounded-lg cursor-pointer 
                    ${(
                        url === '/manrisk-kinerja/pemda/penanganan' ||
                        url === '/manrisk-kinerja/opd/penanganan' ||
                        url === '/manrisk-kinerja/individu/penanganan'
                    ) ? "bg-amber-500 border-amber-500 text-white" : "border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"}
                `}
                onClick={() => {
                    if(jenis === 'pemda'){
                        if (url != 'manrisk-kinerja/pemda/penanganan') {
                            router.push("/manrisk-kinerja/pemda/penanganan");
                            setLoadingHalaman('penanganan');
                        } else {
                            setLoadingHalaman('');
                        }
                    }
                    if(jenis === 'opd'){
                        if (url != 'manrisk-kinerja/opd/penanganan') {
                            router.push("/manrisk-kinerja/opd/penanganan");
                            setLoadingHalaman('penanganan');
                        } else {
                            setLoadingHalaman('');
                        }
                    }
                    if(jenis === 'individu'){
                        if (url != 'manrisk-kinerja/individu/penanganan') {
                            router.push("/manrisk-kinerja/individu/penanganan");
                            setLoadingHalaman('penanganan');
                        } else {
                            setLoadingHalaman('');
                        }
                    }
                }}
            >
                {LoadingHalaman === 'penanganan' ?
                    <LoadingButtonClip />
                    :
                    <TbTools />
                }
                Penanganan
            </button>
            <button
                className={`flex items-center gap-1 py-1 px-3 border rounded-lg cursor-pointer 
                    ${(
                        url === '/manrisk-kinerja/pemda/pemantauan' ||
                        url === '/manrisk-kinerja/opd/pemantauan' ||
                        url === '/manrisk-kinerja/individu/pemantauan'
                    ) ? "bg-gray-700 border-gray-700 text-white" : "border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white"}
                `}
                onClick={() => {
                    if(jenis === 'pemda'){
                        if (url != 'manrisk-kinerja/pemda/pemantauan') {
                            router.push("/manrisk-kinerja/pemda/pemantauan");
                            setLoadingHalaman('pemantauan');
                        } else {
                            setLoadingHalaman('');
                        }
                    }
                    if(jenis === 'opd'){
                        if (url != 'manrisk-kinerja/opd/pemantauan') {
                            router.push("/manrisk-kinerja/opd/pemantauan");
                            setLoadingHalaman('pemantauan');
                        } else {
                            setLoadingHalaman('');
                        }
                    }
                    if(jenis === 'individu'){
                        if (url != 'manrisk-kinerja/individu/pemantauan') {
                            router.push("/manrisk-kinerja/individu/pemantauan");
                            setLoadingHalaman('pemantauan');
                        } else {
                            setLoadingHalaman('');
                        }
                    }
                }}
            >
                {LoadingHalaman === 'pemantauan' ?
                    <LoadingButtonClip />
                    :
                    <TbActivity />
                }
                Pemantauan RTP
            </button>
            <button
                className={`flex items-center gap-1 py-1 px-3 border rounded-lg cursor-pointer 
                    ${(
                        url === '/manrisk-kinerja/pemda/hasil-pemantauan' ||
                        url === '/manrisk-kinerja/opd/hasil-pemantauan' ||
                        url === '/manrisk-kinerja/individu/hasil-pemantauan'
                    ) ? "bg-gray-700 border-gray-700 text-white" : "border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white"}
                `}
                onClick={() => {
                    if(jenis === 'pemda'){
                        if (url != 'manrisk-kinerja/pemda/hasil-pemantauan') {
                            router.push("/manrisk-kinerja/pemda/hasil-pemantauan");
                            setLoadingHalaman('hasil-pemantauan');
                        } else {
                            setLoadingHalaman('');
                        }
                    }
                    if(jenis === 'opd'){
                        if (url != 'manrisk-kinerja/opd/hasil-pemantauan') {
                            router.push("/manrisk-kinerja/opd/hasil-pemantauan");
                            setLoadingHalaman('hasil-pemantauan');
                        } else {
                            setLoadingHalaman('');
                        }
                    }
                    if(jenis === 'individu'){
                        if (url != 'manrisk-kinerja/individu/hasil-pemantauan') {
                            router.push("/manrisk-kinerja/individu/hasil-pemantauan");
                            setLoadingHalaman('hasil-pemantauan');
                        } else {
                            setLoadingHalaman('');
                        }
                    }
                }}
            >
                {LoadingHalaman === 'hasil-pemantauan' ?
                    <LoadingButtonClip />
                    :
                    <TbActivity />
                }
                Hasil Pemantauan
            </button>
        </div>
    )
}