'use client'

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LoadingButtonClip } from "../global/loadingButton";
import { TbActivity, TbChartBar, TbFocus, TbTools } from "react-icons/tb";

export const HeaderSpbe = () => {
    
    const [LoadingHalaman, setLoadingHalaman] = useState<string>('');

    const router = useRouter();
    const url = usePathname();

    return(
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button 
                className={`flex items-center gap-1 py-1 px-3 border rounded-lg cursor-pointer ${url === '/manrisk-spbe/identifikasi' ? "bg-green-500 border-green-500 text-white" : "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"}`}
                onClick={() => {
                    if(url != '/manrisk-spbe/identifikasi'){
                        router.push("/manrisk-spbe/identifikasi");
                        setLoadingHalaman('identifikasi');
                    } else {
                        setLoadingHalaman('');
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
                className={`flex items-center gap-1 py-1 px-3 border rounded-lg cursor-pointer ${url === '/manrisk-spbe/analisa' ? "bg-blue-500 border-blue-500 text-white" : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"}`}
                onClick={() => {
                    if(url != '/manrisk-spbe/analisa'){
                        router.push("/manrisk-spbe/analisa");
                        setLoadingHalaman('analisa');
                    } else {
                        setLoadingHalaman('');
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
                className={`flex items-center gap-1 py-1 px-3 border rounded-lg cursor-pointer ${url === '/manrisk-spbe/penanganan' ? "bg-amber-500 border-amber-500 text-white" : "border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"}`}
                onClick={() => {
                    if(url != 'manrisk-spbe/penanganan'){
                        router.push("/manrisk-spbe/penanganan");
                        setLoadingHalaman('penanganan');
                    } else {
                        setLoadingHalaman('');
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
                className={`flex items-center gap-1 py-1 px-3 border rounded-lg cursor-pointer ${url === '/manrisk-spbe/pemantauan' ? "bg-gray-700 border-gray-700 text-white" : "border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white"}`}
                onClick={() => {
                    if(url != 'manrisk-spbe/pemantauan'){
                        router.push("/manrisk-spbe/pemantauan");
                        setLoadingHalaman('pemantauan');
                    } else {
                        setLoadingHalaman('');
                    }
                }}
            >
                {LoadingHalaman === 'pemantauan' ?
                    <LoadingButtonClip />
                    :
                    <TbActivity />
                }
                Pemantauan
            </button>
        </div>
    )
}