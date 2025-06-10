'use client'

import { ButtonGreenBorder, ButtonSkyBorder } from "@/components/global/button";
import { TbPencil, TbCircleCheck } from "react-icons/tb";
import { useState } from "react";
import { ModalPemantauan } from "./ModalPemantauan";

const Table = () => {

    const [ModalOpen, setModalOpen] = useState<boolean>(false);

    const handleModal = () => {
        if(ModalOpen){
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
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Pemilik Resiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[100px] text-center">Aksi</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[100px] text-center">ID Resiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Resiko Kecurangan yang dimitigasi</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[150px] text-center">Deskripsi/Bentuk Kegiatan Pengendalian</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Penanggung Jawab (PIC)</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Rencana Waktu Pelaksanaan Perlakuan Resiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Realisasi Waktu Pelaksanaan Perlakuan Resiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Progres Tindak Lanjut</th>
                        <th colSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Skala Resiko Setelah Dilakukan Perbaikan/Pengendalian</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Tingkat Resiko(Dampak X Kemungkinan)</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Level Resiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Bukti Pelaksanaan Tindak Lanjut</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Kendala</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Catatan</th>
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
                        <td className="border border-gray-700 px-6 py-4">kepala dinas pendidikan daerah</td>
                        <td className="border border-gray-700 px-6 py-4">-</td>
                        <td className="border border-gray-700 px-6 py-4">TW II 2025</td>
                        <td className="border border-gray-700 px-6 py-4 text-center">100%</td>
                        <td className="border border-gray-700 px-6 py-4 text-center">1</td>
                        <td className="border border-gray-700 px-6 py-4 text-center">2</td>
                        <td className="border border-gray-700 px-6 py-4 text-center">2</td>
                        <td className="border border-gray-700 px-6 py-4 text-center">rendah</td>
                        <td className="border border-gray-700 px-6 py-4">melakukan evaluasi dan monitoring</td>
                        <td className="border border-gray-700 px-6 py-4">penerima BBM sering tidak tepat waktu dalam pengisian evaluasi dan monitoring</td>
                        <td className="border border-gray-700 px-6 py-4">tidak ada catatan</td>
                    </tr>
                </tbody>
            </table>
            <ModalPemantauan 
                isOpen={ModalOpen}
                onClose={handleModal}
            />
        </div>
    )
}

export default Table;