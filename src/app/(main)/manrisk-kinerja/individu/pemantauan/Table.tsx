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
                jenis="pemantauan"
                subKegiatan={dataSubKegiatan.sub_kegiatan}
                indikator={dataSubKegiatan.indikator}
            />
            <TablePemantauan />
        </>
    )
}

export const TablePemantauan = () => {
    return (
        <div className="overflow-auto border border-gray-600">
            <table className="w-full">
                <thead>
                    <tr className="text-white bg-gray-600">
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[50px] text-center">No</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[100px] text-center">Kode Risiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Pernyataan Risiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[150px] text-center">Aksi</th>
                        <th colSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Skala Risiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Pihak Yang Terkena Risiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Rencana Tindak Pengendalian (RTP)</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Waktu Pelaksanaan RTP</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Bentuk/Metode Pemantauan</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Penanggung Jawab Pemantauan</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Realisasi Waktu Pelaksanaan Tindak Pengendalian</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Keterangan</th>
                    </tr>
                </thead>
                <tbody>
                    <React.Fragment>
                        {/* Pelakasana - Pemilik Resiko, Pagu - Kode Resiko */}
                        <tr>
                            <td className="border-b border-gray-600 px-6 py-4 text-center">1</td>
                            <td className="border border-gray-600 px-6 py-4">RISK-1</td>
                            <td className="border border-gray-600 px-6 py-4">Pernyataan Risiko pertama</td>
                            <td className="border border-gray-600 px-6 py-4">
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
                            <td className="border border-gray-600 px-6 py-4">(B)</td>
                            <td className="border border-gray-600 px-6 py-4">Level Resiko Sedang</td>
                            <td className="border border-gray-600 px-6 py-4">Pihak Yang Terkena Risiko</td>
                            <td className="border border-gray-600 px-6 py-4">Rencana Tindak Pengendalian</td>
                            <td className="border border-gray-600 px-6 py-4">Waktu Pelaksanaan</td>
                            <td className="border border-gray-600 px-6 py-4">Bentuk Pemantauan</td>
                            <td className="border border-gray-600 px-6 py-4">Penanggung Jawab</td>
                            <td className="border border-gray-600 px-6 py-4">Realisasi Waktu</td>
                            <td className="border border-gray-600 px-6 py-4">Keterangan</td>
                        </tr>
                    </React.Fragment>
                </tbody>
            </table>
        </div>
    )
} 