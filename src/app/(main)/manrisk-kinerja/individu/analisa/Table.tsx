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
                jenis="analisa"
                subKegiatan={dataSubKegiatan.sub_kegiatan}
                indikator={dataSubKegiatan.indikator}
            />
            <TableAnalisa />
        </>
    )
}

export const TableAnalisa = () => {
    return (
        <div className="overflow-auto border border-blue-500">
            <table className="w-full">
                <thead>
                    <tr className="text-white bg-blue-500">
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[50px] text-center">No</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[100px] text-center">Kode Risiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Pernyataan Risiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[150px] text-center">Aksi</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Skala Kemungkinan</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Dampak</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Skala Dampak</th>
                        <th colSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Skala Risiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Pihak Yang Terkena Risiko</th>
                    </tr>
                </thead>
                <tbody>
                    <React.Fragment>
                        {/* Pelakasana - Pemilik Resiko, Pagu - Kode Resiko */}
                        <tr>
                            <td className="border-b border-blue-500 px-6 py-4 text-center">1</td>
                            <td className="border border-blue-500 px-6 py-4">RISK-1</td>
                            <td className="border border-blue-500 px-6 py-4">Pernyataan Risiko pertama</td>
                            <td className="border border-blue-500 px-6 py-4">
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
                            <td className="border border-blue-500 px-6 py-4">Skala Kemungkinan</td>
                            <td className="border border-blue-500 px-6 py-4">Dampak</td>
                            <td className="border border-blue-500 px-6 py-4">Skala Dampak</td>
                            <td className="border border-blue-500 px-6 py-4">(B) Skala Risiko</td>
                            <td className="border border-blue-500 px-6 py-4">Skala Risiko</td>
                            <td className="border border-blue-500 px-6 py-4">Pihak Yang Terkena Risiko</td>
                        </tr>
                    </React.Fragment>
                </tbody>
            </table>
        </div>
    )
} 