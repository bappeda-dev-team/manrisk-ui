'use client'

import { ButtonGreenBorder, ButtonSkyBorder } from "@/components/global/button";
import { TbPencil, TbCircleCheck } from "react-icons/tb";
import { useState } from "react";
import { ModalPemantauan } from "./ModalPemantauan";
import { Status } from "@/components/page/Status";
import { AlertVerifikasi } from "@/components/global/alert/sweetAlert2";
import { toast } from "react-toastify";

interface PemantauanValue {
    id_resiko: number;
    nama_pemilik_resiko: string;
    resiko_kecurangan_yang_dimitigasi: string;
    bentuk_kegiatan_pengendalian: string;
    penanggung_jawab: string;
    rencana_waktu_pelaksanaan: string;
    realisasi_waktu_pelaksanaan: string;
    progres_tindak_lanjut: string;
    bukti_pelaksanaan_tindak_lanjut: string;
    kendala: string;
    catatan: string;
    status: string;
    catatan_status: string;
}

const Table = () => {

    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [DataToEdit, setDataToEdit] = useState<any>(null);

    const handleModal = (data?: PemantauanValue) => {
        if (ModalOpen) {
            setModalOpen(false);
            setDataToEdit(null);
        } else {
            setModalOpen(true);
            setDataToEdit(data);
        }
    }
    const handleVerifikasi = async(keterangan: string) => {
        const DataVerifikasi = {
            keterangan: keterangan,
        }
        console.log(DataVerifikasi);
        toast.success("Data Diverifikasi");
    }

    const Data = [
        {
            id_resiko: 1,
            nama_pemilik_resiko: 'Sekretaris Daerah',
            resiko_kecurangan_yang_dimitigasi: 'Kegiatan Beasiswa Mahasiswa (BBM)',
            bentuk_kegiatan_pengendalian: 'penerima bantuan ada hubungan kekerabatan, pertemanan dan lain lain',
            penanggung_jawab: 'Kepala Dinas Pendidikan Daerah',
            rencana_waktu_pelaksanaan: 'Setiap kegiatan dilaksanakan',
            realisasi_waktu_pelaksanaan: 'TW II 2025',
            progres_tindak_lanjut: '100%',
            bukti_pelaksanaan_tindak_lanjut: 'Melakukan evaluasi dan monitoring dalam pemberian bantuan beasiswa mahasiswa',
            kendala: 'Penerima BBM sering tidak tepat waktu dalam pengisian evaluasi dan monitoring',
            catatan: 'tidak ada catatan',
            status: 'disetujui',
            catatan_status: 'Sesuai dengan SOP'
        }
    ];

    return (
        <div className="overflow-auto mt-2 rounded-t-lg border border-gray-700">
            <table className="w-full">
                <thead>
                    <tr className="text-white bg-gray-700">
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[50px] text-center">No</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Pemilik Risiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[100px] text-center">Aksi</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[100px] text-center">ID Risiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Risiko Kecurangan yang dimitigasi</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Deskripsi/Bentuk Kegiatan Pengendalian</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Penanggung Jawab (PIC)</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Rencana Waktu Pelaksanaan Perlakuan Risiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Realisasi Waktu Pelaksanaan Perlakuan Risiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[150px] text-center">Progres Tindak Lanjut</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Bukti Pelaksanaan Tindak Lanjut</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Kendala</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Catatan</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[250px] text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {Data.map((data: PemantauanValue, index: number) => (
                        <tr key={data.id_resiko}>
                            <td className="border-b border-gray-700 px-6 py-4 text-center">{index + 1}</td>
                            <td className="border border-gray-700 px-6 py-4">{data.nama_pemilik_resiko}</td>
                            <td className="border border-gray-700 px-6 py-4 text-center">
                                <div className="flex flex-col gap-2 justify-center">
                                    <ButtonGreenBorder
                                        className="flex items-center gap-1"
                                        onClick={() => handleModal(data)}
                                    >
                                        <TbPencil />
                                        Edit
                                    </ButtonGreenBorder>
                                    <ButtonSkyBorder
                                        className="flex items-center gap-1"
                                        onClick={() => 
                                            AlertVerifikasi("Verifikasi", "masukkan keterangan", "question", "Verifikasi", "Tolak", "Batal").then((result) => {
                                                if(result.isConfirmed){
                                                    handleVerifikasi(result?.value.keteragan)
                                                } else if(result.isDenied){
                                                    handleVerifikasi(result?.value.keteragan)
                                                }
                                            })
                                        }
                                    >
                                        <TbCircleCheck />
                                        Verifikasi
                                    </ButtonSkyBorder>
                                </div>
                            </td>
                            <td className="border border-gray-700 px-6 py-4">{data.id_resiko}</td>
                            <td className="border border-gray-700 px-6 py-4">{data.resiko_kecurangan_yang_dimitigasi}</td>
                            <td className="border border-gray-700 px-6 py-4 text-center">{data.bentuk_kegiatan_pengendalian}</td>
                            <td className="border border-gray-700 px-6 py-4">{data.penanggung_jawab}</td>
                            <td className="border border-gray-700 px-6 py-4">{data.rencana_waktu_pelaksanaan}</td>
                            <td className="border border-gray-700 px-6 py-4">{data.realisasi_waktu_pelaksanaan}</td>
                            <td className="border border-gray-700 px-6 py-4 text-center">{data.progres_tindak_lanjut}</td>
                            <td className="border border-gray-700 px-6 py-4">{data.bukti_pelaksanaan_tindak_lanjut}</td>
                            <td className="border border-gray-700 px-6 py-4">{data.kendala}</td>
                            <td className="border border-gray-700 px-6 py-4">{data.catatan}</td>
                            <td className="border border-green-500 px-6 py-4">
                                <Status 
                                    status={data.status}
                                    catatan={data.catatan_status}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalPemantauan
                isOpen={ModalOpen}
                onClose={handleModal}
                data={DataToEdit}
            />
        </div>
    )
}

export default Table;