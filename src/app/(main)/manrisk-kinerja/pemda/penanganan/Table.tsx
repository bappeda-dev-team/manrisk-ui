'use client'

import React from "react"
import { ButtonSkyBorder, ButtonGreenBorder } from "@/components/global/button"
import { TbPencil, TbCircleCheck } from "react-icons/tb"
import { AlertVerifikasi } from "@/components/global/alert/sweetAlert2"
import { toast } from "react-toastify"

export const Table = () => {

    const handleVerifikasi = (keterangan: string) => {
        const verifikasi = {
            keterangan: keterangan,
        }
        console.log(verifikasi);
        toast.success("Berhasil verifikasi");
    }

    return (
        <>
            <div className="border border-yellow-500">
                <h1 className="p-4 font-semibold">Tujuan Pemda : Contoh Tujuan Pemda Pertama</h1>
            </div>
            <div className="overflow-auto border border-yellow-500">
                <table className="w-full">
                    <thead>
                        <tr className="text-white bg-yellow-500">
                            <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[50px] text-center">No</th>
                            <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Kode Risiko</th>
                            <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Sasaran Strategis Pemda</th>
                            <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[150px] text-center">Aksi</th>
                            <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Pernyataan Risiko</th>
                            <th colSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Skala Risiko</th>
                            <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Pihak Yang Terkena Risiko</th>
                            <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Rencanan Tindak Pengendalian (RTP)</th>
                            <th className="border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Perangkat Daerah Yang Menangani</th>
                        </tr>
                    </thead>
                    <tbody>
                        <React.Fragment>
                            {/* Pelakasana - Pemilik Resiko, Pagu - Kode Resiko */}
                            <tr>
                                <td className="border-b border-yellow-500 px-6 py-4 text-center">1</td>
                                <td className="border border-yellow-500 px-6 py-4">RISK-1</td>
                                <td className="border border-yellow-500 px-6 py-4">Rekin Strategic Pemda</td>
                                <td className="border border-yellow-500 px-6 py-4">
                                    <div className="flex flex-col gap-2 justify-center">
                                        <ButtonGreenBorder
                                            className="flex items-center gap-1"

                                        >
                                            <TbPencil />
                                            Edit
                                        </ButtonGreenBorder>
                                        <ButtonSkyBorder
                                            className="flex items-center gap-1"
                                            onClick={() => {
                                                AlertVerifikasi("Verifikasi", "masukkan keterangan", "question", "Verifikasi", "Tolak", "Batal").then((result) => {
                                                    if(result.isConfirmed){
                                                        handleVerifikasi(result?.value.keterangan);
                                                    }
                                                    if(result.isDenied){
                                                        handleVerifikasi(result?.value.keterangan);
                                                    }
                                                })
                                            }}
                                        >
                                            <TbCircleCheck />
                                            Verifikasi
                                        </ButtonSkyBorder>
                                    </div>
                                </td>
                                <td className="border border-yellow-500 px-6 py-4">Pernyataan Risiko</td>
                                <td className="border border-yellow-500 px-6 py-4">Skala Risiko</td>
                                <td className="border border-yellow-500 px-6 py-4">Skala Risiko</td>
                                <td className="border border-yellow-500 px-6 py-4">Pihak Yang Terkena Risiko</td>
                                <td className="border border-yellow-500 px-6 py-4">Rencana Tindak Pengendalian</td>
                                <td className="border border-yellow-500 px-6 py-4">Perangkat Daerah Yang Menangani</td>
                            </tr>
                        </React.Fragment>
                    </tbody>
                </table>
            </div>
        </>
    )
} 