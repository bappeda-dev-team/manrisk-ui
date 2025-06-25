import React from "react"
import { ButtonSkyBorder, ButtonGreenBorder } from "@/components/global/button"
import { TbPencil, TbCircleCheck } from "react-icons/tb"
import { TableSubKegiatan } from "../../TableSubKegiatan"

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
                jenis="hasil-pemantauan"
                subKegiatan={dataSubKegiatan.sub_kegiatan}
                indikator={dataSubKegiatan.indikator}
            />
            <TablePemantauan />
        </>
    )
}

export const TablePemantauan = () => {
    return (
        <div className="overflow-auto border border-cyan-600">
            <table className="w-full">
                <thead>
                    <tr className="text-white bg-cyan-600">
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[50px] text-center">No</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[100px] text-center">Kode Risiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Pernyataan Risiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[150px] text-center">Aksi</th>
                        <th colSpan={3} className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Kejadian Resiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Pihak Yang Terkena Risiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Rencana Tindak Pengendalian (RTP)</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Realisasi Tindak Pengendalian (RTP)</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Apakah Risiko Dapat Terkendali Dengan Baik</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Bagaimanakah Dampaknya</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Catatan</th>
                    </tr>
                    <tr className="bg-cyan-800 text-white">
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Tanggal</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Sebab</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Dampak</th>
                    </tr>
                </thead>
                <tbody>
                    <React.Fragment>
                        {/* Pelakasana - Pemilik Resiko, Pagu - Kode Resiko */}
                        <tr>
                            <td className="border-b border-cyan-600 px-6 py-4 text-center">1</td>
                            <td className="border border-cyan-600 px-6 py-4">RISK-1</td>
                            <td className="border border-cyan-600 px-6 py-4">Pernyataan Risiko pertama</td>
                            <td className="border border-cyan-600 px-6 py-4">
                                <div className="flex flex-col gap-2 justify-center">
                                    <ButtonGreenBorder
                                        className="flex items-center gap-1"

                                    >
                                        <TbPencil />
                                        Edit
                                    </ButtonGreenBorder>
                                    <ButtonSkyBorder
                                        className="flex items-center gap-1"

                                    >
                                        <TbCircleCheck />
                                        Verifikasi
                                    </ButtonSkyBorder>
                                </div>
                            </td>
                            <td className="border border-cyan-600 px-6 py-4 text-center">(B)</td>
                            <td className="border border-cyan-600 px-6 py-4 text-center">Sebab</td>
                            <td className="border border-cyan-600 px-6 py-4 text-center">Dampak</td>
                            <td className="border border-cyan-600 px-6 py-4">Pihak Yang Terkena Risiko</td>
                            <td className="border border-cyan-600 px-6 py-4">Rencana Tindak Pengendalian</td>
                            <td className="border border-cyan-600 px-6 py-4">Realisasi Tindak Pengendalian</td>
                            <td className="border border-cyan-600 px-6 py-4">Ya</td>
                            <td className="border border-cyan-600 px-6 py-4">Contoh Dampak yang Terjadi</td>
                            <td className="border border-cyan-600 px-6 py-4">Catatan</td>
                        </tr>
                    </React.Fragment>
                </tbody>
            </table>
        </div>
    )
} 