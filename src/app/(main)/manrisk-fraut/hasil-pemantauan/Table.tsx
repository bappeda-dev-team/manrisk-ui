'use client'

import { ButtonGreenBorder, ButtonSkyBorder } from "@/components/global/button";
import { TbPencil, TbCircleCheck } from "react-icons/tb";
import { useState } from "react";
import { ModalHasilPemantauan } from "./ModalHasilPemantauan";

const Table = () => {

    const [ModalOpen, setModalOpen] = useState<boolean>(false);

    const handleModal = () => {
        if (ModalOpen) {
            setModalOpen(false);
        } else {
            setModalOpen(true);
        }
    }

    return (
        <div className="overflow-auto mt-2 rounded-t-lg border border-gray-700">
            <table className="w-full">
                <thead>
                    <tr className="text-white bg-gray-700">
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[50px] text-center">No</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Pemilik Risiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[100px] text-center">Aksi</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[100px] text-center">ID Risiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Risiko Kecurangan yang dimitigasi</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[150px] text-center">Deskripsi/Bentuk Kegiatan Pengendalian</th>
                        <th colSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Skala Risiko Setelah Dilakukan Perbaikan/Pengendalian</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Tingkat Risiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Level Risiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Catatan</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[250px] text-center">Status</th>
                    </tr>
                    <tr className="text-white bg-gray-800">
                        <th className="border-r border-b py-2 px-6 border-gray-300 min-w-[100px] text-center">Dampak</th>
                        <th className="border-r border-b py-2 px-6 border-gray-300 min-w-[100px] text-center">Kemungkinan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border-b border-gray-700 px-6 py-4 text-center">1</td>
                        <td className="border border-gray-700 px-6 py-4">Sekretaris Dinas</td>
                        <td className="border border-gray-700 px-6 py-4 text-center">
                            <div className="flex flex-col gap-2 justify-center">
                                <ButtonGreenBorder
                                    className="flex items-center gap-1"
                                    onClick={handleModal}
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
                        <td className="border border-gray-700 px-6 py-4">id 2025</td>
                        <td className="border border-gray-700 px-6 py-4">penerima bantuan ada hubungan kekerabatan, pertemanan dan lain lain</td>
                        <td className="border border-gray-700 px-6 py-4 text-center">konfirmasi persiapan dan laporan pelaksanaan kegiatan</td>
                        <td className="border border-gray-700 px-6 py-4 text-center">1</td>
                        <td className="border border-gray-700 px-6 py-4 text-center">2</td>
                        <td className="border border-gray-700 px-6 py-4 text-center">2</td>
                        <td className="border border-gray-700 px-6 py-4 text-center">rendah</td>
                        <td className="border border-gray-700 px-6 py-4">tidak ada catatan</td>
                        <td className="border border-green-500 px-6 py-4">
                            <div className="flex flex-col gap-2">
                                <p className="flex items-center gap-1 bg-green-500 text-white p-1 border rounded-xl justify-center"><TbCircleCheck /> Terverivikasi</p>
                                <p>Diverifikasi karena sudah pas</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <ModalHasilPemantauan 
                isOpen={ModalOpen}
                onClose={handleModal}
            />
        </div>
    )
}

export default Table;