'use client'

import { ButtonGreenBorder, ButtonSkyBorder } from "@/components/global/button";
import { TbPencil, TbCircleCheck } from "react-icons/tb";
import { ModalIdentifikasi } from "./ModalIdentifikasi";
import { useState } from "react";
import { AlertQuestion } from "@/components/global/alert/sweetAlert2";
import { toast } from 'react-toastify';

const Table = () => {

    const [ModalOpen, setModalOpen] = useState<boolean>(false);

    const handleModal = () => {
        if(ModalOpen){
            setModalOpen(false);
        } else {
            setModalOpen(true);
        }
    }

    const cekToast = () => {
        toast.success("Berhasil Verifikasi");
    }
        
    return (
        <div className="overflow-auto mt-2 rounded-t-lg border border-green-500">
            <table className="w-full">
                <thead>
                    <tr className="text-white bg-green-500">
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[50px] text-center">No</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Pemilik Resiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[100px] text-center">Aksi</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Tahap Proses Bisnis</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[150px] text-center">ID Resiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Strategi/Program Unit Kerja</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Nama Resiko Fraut</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Jenis Resiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Kemungkinan Skenario Kecurangan</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Gejala / Indikasi</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Kemungkinan Pihak Terkait</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[250px] text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border-b border-green-500 px-6 py-4 text-center">1</td>
                        <td className="border border-green-500 px-6 py-4">Sekretaris Dinas</td>
                        <td className="border border-green-500 px-6 py-4 text-center">
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
                                    onClick ={() => {
                                        AlertQuestion("Verifikasi", "", "question", "Verifikasi", "Batal").then((result) => {
                                            if(result.isConfirmed){
                                                cekToast();
                                            }
                                        })
                                    }}
                                >
                                    <TbCircleCheck />
                                    Verifikasi
                                </ButtonSkyBorder>
                            </div>
                        </td>
                        <td className="border border-green-500 px-6 py-4">Kegiatan Bantuan Beasiswa Mahasiswa (BBM)</td>
                        <td className="border border-green-500 px-6 py-4 text-center">id 2025</td>
                        <td className="border border-green-500 px-6 py-4">Pelaksanaan pendaftaran bantuan beasiswa mahasiswa (BBM)</td>
                        <td className="border border-green-500 px-6 py-4">Adanya kerjasama/penyuapan kepada staf/pejabat terkait agar pendaftar mendapat bantuan beasiswa</td>
                        <td className="border border-green-500 px-6 py-4">Penyuapan, Nepotisme</td>
                        <td className="border border-green-500 px-6 py-4">Penerima bantuan ada hubungan kekerabatan, pertemanan dan lain-lain</td>
                        <td className="border border-green-500 px-6 py-4">Hal-hal yang tidak sesuai dengan peraturan/ ketentuan</td>
                        <td className="border border-green-500 px-6 py-4">Staff terkait & PPTK</td>
                        <td className="border border-green-500 px-6 py-4">
                            <div className="flex flex-col gap-2">
                                <p className="flex items-center gap-1 bg-green-500 text-white p-1 border rounded-xl justify-center"><TbCircleCheck /> Terverivikasi</p>
                                <p>Diverifikasi karena sudah pas</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <ModalIdentifikasi 
                isOpen={ModalOpen}
                onClose={handleModal}
            />
        </div>
    )
}

export default Table;