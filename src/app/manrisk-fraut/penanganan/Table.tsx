'use client'

import { ButtonGreenBorder, ButtonSkyBorder } from "@/components/global/button";
import { TbPencil, TbCircleCheck } from "react-icons/tb";
import { useState } from "react";
import { ModalPenanganan } from "./ModalPenanganan";
import { AlertQuestion } from "@/components/global/alert/sweetAlert2";
import { toast } from "react-toastify";

const Table = () => {

    const [ModalOpen, setModalOpen] = useState<boolean>(false);

    const handleModal = () => {
        if(ModalOpen){
            setModalOpen(false);
        } else {
            setModalOpen(true);
        }
    }

    const notifikasiBerhasil = () => {
        toast.success("Berhasil Verifikasi");
    }
    
    return (
        <div className="overflow-auto mt-2 rounded-t-lg border border-yellow-500">
            <table className="w-full">
                <thead>
                    <tr className="text-white bg-yellow-500">
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[50px] text-center">No</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Pemilik Resiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[100px] text-center">Aksi</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Tahap Proses Bisnis</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[150px] text-center">ID Resiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Existing Control / Internal Control</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Jenis Perlakuan Resiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Rencana Perlakuan Resiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Biaya Perlakuan Resiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Target Waktu</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Penanggung Jawab (PIC)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border-b border-yellow-500 px-6 py-4 text-center">1</td>
                        <td className="border border-yellow-500 px-6 py-4">Sekretaris Dinas</td>
                        <td className="border border-yellow-500 px-6 py-4 text-center">
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
                                    onClick={() => {
                                        AlertQuestion("Verifikasi", "", "question", "Verifikasi", "Batal").then((result) => {
                                            if(result.isConfirmed){
                                                notifikasiBerhasil();
                                            }
                                        })
                                    }}
                                >
                                    <TbCircleCheck />
                                    Verifikasi
                                </ButtonSkyBorder>
                            </div>
                        </td>
                        <td className="border border-yellow-500 px-6 py-4">Kegiatan Bantuan Beasiswa Mahasiswa (BBM)</td>
                        <td className="border border-yellow-500 px-6 py-4 text-center">id 2025</td>
                        <td className="border border-yellow-500 px-6 py-4">Melakukan verifikasi, monitoring dan evaluasi secara bertahap</td>
                        <td className="border border-yellow-500 px-6 py-4">Mitigasi</td>
                        <td className="border border-yellow-500 px-6 py-4">melakukan pengecekan dokumen-dokumen berjenjang</td>
                        <td className="border border-yellow-500 px-6 py-4">Rp. 100.000</td>
                        <td className="border border-yellow-500 px-6 py-4">TW II 2025</td>
                        <td className="border border-yellow-500 px-6 py-4">Kepala Dinas Pendidikan Daerah</td>
                    </tr>
                </tbody>
            </table>
            <ModalPenanganan 
                isOpen={ModalOpen}
                onClose={handleModal}
            />
        </div>
    )
}

export default Table;