'use client'

import { useState } from "react";
import { toast } from "react-toastify";
import { ButtonRedBorder, ButtonGreenBorder } from "@/components/global/button";
import { AlertQuestion } from "@/components/global/alert/sweetAlert2";
import { TbCircleCheck,TbCreativeCommonsSa  } from "react-icons/tb";
import { useGet } from "@/hook/useGet";
import { ApiResponse, RisikoData } from "@/app/types";

const Data = [
    {
        "jenis_risiko": "Contoh Jenis Risiko",
        "uraian": "Uraian jenis risiko",
    },
    {
        "jenis_risiko": "Contoh Jenis Risiko",
        "uraian": "Uraian jenis risiko",
    },
    {
        "jenis_risiko": "Contoh Jenis Risiko",
        "uraian": "Uraian jenis risiko",
    },
    {
        "jenis_risiko": "Contoh Jenis Risiko",
        "uraian": "Uraian jenis risiko",
    },
    {
        "jenis_risiko": "Contoh Jenis Risiko",
        "uraian": "Uraian jenis risiko",
    },
    {
        "jenis_risiko": "Contoh Jenis Risiko",
        "uraian": "Uraian jenis risiko",
    },
    {
        "jenis_risiko": "Contoh Jenis Risiko",
        "uraian": "Uraian jenis risiko",
    },
    {
        "jenis_risiko": "Contoh Jenis Risiko",
        "uraian": "Uraian jenis risiko",
    }
]

export const Table = () => {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);
    const handleFetchTrigger = () => {
        setFetchTrigger((prev) => !prev);
    }

    const { Data: RisikoData, Loading, Error } = useGet<ApiResponse<RisikoData>>({url: `${API_URL}/risiko-kecurangan`, fetchTrigger: FetchTrigger})
    
    return (
        <div className="overflow-auto mt-2 rounded-t-lg border border-green-500">
            <table className="w-full">
                <thead>
                    <tr className="text-white bg-green-500">
                        <th className="border-r border-b py-4 px-6 border-gray-300 max-w-[50px] text-center">No</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Jenis Risiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[400px] text-center">Uraian</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 max-w-[150px] text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {Data.map((data: any, index: number) => (
                        <tr key={index}>
                            <td className="border-b border-green-500 px-6 py-4 text-center">{index + 1}</td>
                            <td className="border border-green-500 px-6 py-4">{data.jenis_risiko || "-"}</td>
                            <td className="border border-green-500 px-6 py-4 text-center">{data.uraian || "-"}</td>
                            <td className="border border-green-500 px-6 py-4 text-center">
                                <div className="flex flex-col gap-2 justify-center">
                                    <ButtonGreenBorder
                                        className="flex items-center gap-1"
                                        onClick={() => toast.success("Berhasil Dipilih Untuk Manrisk Fraud")}
                                    >
                                        <TbCircleCheck />
                                        Edit
                                    </ButtonGreenBorder>
                                    <ButtonRedBorder
                                        className="flex items-center gap-1"
                                        onClick={() => {
                                            AlertQuestion("Batalkan Pilihan", "Dengan dibatalkan, manrisk fraud yang sudah terisi akan terhapus", "warning", "Hapus", "Batal").then((result) => {
                                                if(result.isConfirmed){
                                                    toast.success("Berhasil menghapus pilihan rencana kinerja");
                                                }
                                            })
                                        }}
                                    >
                                        <TbCreativeCommonsSa />
                                        Hapus
                                    </ButtonRedBorder>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
} 