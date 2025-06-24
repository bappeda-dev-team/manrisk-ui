import React from "react"
import { ButtonSkyBorder, ButtonGreenBorder } from "@/components/global/button"
import { TbPencil, TbCircleCheck } from "react-icons/tb"

export const Table = () => {
    return (
        <>
            <table className="w-full">
                <thead>
                    <tr className="text-white bg-black">
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[400px] text-center">Sub Kegiatan</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Indikator</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[100px] text-center">Target</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[100px] text-center">Satuan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border px-6 py-4">Sub Kegiatan</td>
                        <td className="border px-6 py-4">Indikator</td>
                        <td className="border px-6 py-4 text-center">Target</td>
                        <td className="border px-6 py-4 text-center">Satuan</td>
                    </tr>
                </tbody>
            </table>
            <TableIdentifikasi />
        </>
    )
}

export const TableIdentifikasi = () => {
    return (
        <div className="overflow-auto border border-green-500">
            <table className="w-full">
                <thead>
                    <tr className="text-white bg-green-500">
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[50px] text-center">No</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Pelaksana</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Pemilik Risiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[150px] text-center">Aksi</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Pohon Kinerja</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[150px] text-center">Sasaran Operational</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[150px] text-center">Indikator</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[150px] text-center">Target/Satuan</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[150px] text-center">Pagu</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[20px] text-center">Permasalahan</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[20px] text-center">Sebab Permasalahan</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[20px] text-center">Pernyataan Risiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[20px] text-center">Kode Risiko</th>
                    </tr>
                </thead>
                <tbody>
                    <React.Fragment>
                        {/* Pelakasana - Pemilik Resiko, Pagu - Kode Resiko */}
                        <tr>
                            <td rowSpan={8} className="border-b border-green-500 px-6 py-4 text-center">1</td>
                            <td rowSpan={8} className="border border-green-500 px-6 py-4">Nama Level 4</td>
                            <td rowSpan={8} className="border border-green-500 px-6 py-4">Nama Level 3</td>
                            <td rowSpan={8} className="border border-green-500 px-6 py-4">
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
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td rowSpan={8} className="border border-green-500 px-6 py-4">Pagu Rekin Level 3</td>
                            <td rowSpan={8} className="border border-green-500 px-6 py-4">Permasalahan</td>
                            <td rowSpan={8} className="border border-green-500 px-6 py-4">Sebab Permasalahan</td>
                            <td rowSpan={8} className="border border-green-500 px-6 py-4">Pernyataan Risiko</td>
                            <td rowSpan={8} className="border border-green-500 px-6 py-4">Kode Risiko</td>
                        </tr>
                        {/* Pokin Atasan */}
                        <tr>
                            <td rowSpan={4} className="border border-green-500 px-6 py-4">Pohon Kinerja Atasan</td>
                        </tr>
                        <tr>
                            <td rowSpan={3} className="border border-green-500 px-6 py-4">Rekin Atasan</td>
                        </tr>
                        <tr>
                            <td className="border border-green-500 px-6 py-4">Indikator</td>
                            <td className="border border-green-500 px-6 py-4">target/satuan</td>
                        </tr>
                        <tr>
                            <td className="border border-green-500 px-6 py-4">Indikator</td>
                            <td className="border border-green-500 px-6 py-4">target/satuan</td>
                        </tr>
                        {/* Pokin Pelaksana */}
                        <tr>
                            <td rowSpan={3} className="border border-green-500 px-6 py-4">Pohon Kinerja Pelaksana</td>
                        </tr>
                        <tr>
                            <td rowSpan={2} className="border border-green-500 px-6 py-4">Rekin Pelaksana</td>
                        </tr>
                        <tr>
                            <td className="border border-green-500 px-6 py-4">Indikator</td>
                            <td className="border border-green-500 px-6 py-4">target/satuan</td>
                        </tr>
                    </React.Fragment>
                </tbody>
            </table>
        </div>
    )
} 