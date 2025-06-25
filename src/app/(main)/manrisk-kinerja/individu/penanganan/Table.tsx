'use client'

import React from "react"
import { ButtonSkyBorder, ButtonGreenBorder } from "@/components/global/button"
import { TbPencil, TbCircleCheck, TbCircleCheckFilled } from "react-icons/tb"
import { TableSubKegiatan } from "../../TableSubKegiatan"
import { AlertVerifikasi } from "@/components/global/alert/sweetAlert2"
import { toast } from "react-toastify"

export const Table = () => {

    const dataSubKegiatan = {
        sub_kegiatan: "Contoh Sub Kegiatan Pertama",
        indikator: [
            {
                indikator: "contoh indikator pertama",
                target: [
                    {
                        target: "20",
                        satuan: "%"
                    }
                ]
            }
        ]
    }

    return (
        <>
            <TableSubKegiatan
                jenis="penanganan"
                subKegiatan={dataSubKegiatan.sub_kegiatan}
                indikator={dataSubKegiatan.indikator}
            />
            <TablePenanganan />
        </>
    )
}

export const TablePenanganan = () => {

    const handleVerifikasi = (keterangan: string) => {
        const verifikasi = {
            keterangan: keterangan,
        }
        console.log(verifikasi);
        toast.success("Berhasil verifikasi");
    }

    return (
        <div className="overflow-auto border border-yellow-500">
            <table className="w-full">
                <thead>
                    <tr className="text-white bg-yellow-500">
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[50px] text-center">No</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[100px] text-center">Kode Risiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Pernyataan Risiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[150px] text-center">Aksi</th>
                        <th rowSpan={2} colSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Skala Risiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Pihak Yang Terkena Risiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Rencana Tindak Pengendalian (RTP)</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Pagu Anggaran (Rp.)</th>
                        <th colSpan={12} className="border-r border-b py-2 px-6 border-gray-300 min-w-[200px] text-center">Waktu Pelaksanaan RPT</th>
                    </tr>
                    <tr className="text-white bg-yellow-700">
                        {[...Array(12)].map((_, index) => (
                            <th key={index} className="border-r border-b py-2 px-3 border-gray-300 min-w-[50px] text-center">
                                {index + 1}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <React.Fragment>
                        {/* Pelakasana - Pemilik Resiko, Pagu - Kode Resiko */}
                        <tr>
                            <td className="border-b border-yellow-500 px-6 py-4 text-center">1</td>
                            <td className="border border-yellow-500 px-6 py-4">RISK-1</td>
                            <td className="border border-yellow-500 px-6 py-4">Pernyataan Risiko pertama</td>
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
                            <td className="border border-yellow-500 px-6 py-4">(B) Skala Risiko</td>
                            <td className="border border-yellow-500 px-6 py-4">Skala Risiko</td>
                            <td className="border border-yellow-500 px-6 py-4">Pihak Yang Terkena Risiko</td>
                            <td className="border border-yellow-500 px-6 py-4">Rencana Tindak Pengendalian (RTP)</td>
                            <td className="border border-yellow-500 px-6 py-4">Rp.4.000.000</td>
                            {[...Array(12)].map((_, index) => (
                                <td key={index} className="border border-yellow-500 px-6 py-4 text-green-700">
                                    <TbCircleCheckFilled />
                                </td>
                            ))}
                        </tr>
                    </React.Fragment>
                </tbody>
            </table>
        </div>
    )
} 