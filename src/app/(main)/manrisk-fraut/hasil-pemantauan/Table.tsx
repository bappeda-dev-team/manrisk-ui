'use client'

import { ButtonGreenBorder, ButtonSkyBorder } from "@/components/global/button";
import { TbPencil, TbCircleCheck } from "react-icons/tb";
import { useState } from "react";
import { ModalHasilPemantauan } from "./ModalHasilPemantauan";
import { Status } from "@/components/page/Status";
import { AlertVerifikasi } from "@/components/global/alert/sweetAlert2";
import { toast } from "react-toastify";

interface HasilPemantauanValue {
    id_resiko: number;
    nama_pemilik_resiko: string;
    resiko_kecurangan_yang_dimitigasi: string;
    bentuk_kegiatan_pengendalian: string;
    dampak: number,
    kemungkinan: number,
    tingkat_resiko: number,
    level_resiko: string,
    catatan: string;
    status: string;
    catatan_status: string;
}

const Table = () => {

    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [DataToEdit, setDataToEdit] = useState<any>(null)

    const handleModal = (data?: HasilPemantauanValue) => {
        if (ModalOpen) {
            setModalOpen(false);
            setDataToEdit(null);
        } else {
            setModalOpen(true);
            setDataToEdit(data);
        }
    }
    const handleVerifikasi = (id: number, keterangan: string) => {
        const DataVerifikasi = {
            id: id,
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
            dampak: 3,
            kemungkinan: 3,
            tingkat_resiko: 9,
            level_resiko: 'Sedang',
            catatan: 'tidak ada catatan',
            status: 'disetujui',
            catatan_status: 'Sesuai dengan SOP'
        }
    ];

    return (
        <div className="overflow-auto mt-2 rounded-t-lg border border-cyan-600">
            <table className="w-full">
                <thead>
                    <tr className="text-white bg-cyan-600">
                        <th rowSpan={2} className="border-r border-b py-4 px-6 min-w-[50px] text-center">No</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 min-w-[200px] text-center">Pemilik Risiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 min-w-[100px] text-center">Aksi</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 min-w-[100px] text-center">ID Risiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 min-w-[300px] text-center">Risiko Kecurangan yang dimitigasi</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 min-w-[300px] text-center">Deskripsi/Bentuk Kegiatan Pengendalian</th>
                        <th colSpan={2} className="border-r border-b py-4 px-6 min-w-[300px] text-center">Skala Risiko Setelah Dilakukan Perbaikan/Pengendalian</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 min-w-[200px] text-center">Tingkat Risiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 min-w-[200px] text-center">Level Risiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 min-w-[200px] text-center">Catatan</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 min-w-[250px] text-center">Status</th>
                    </tr>
                    <tr className="text-white bg-cyan-600">
                        <th className="border-r border-b py-2 px-6 min-w-[100px] text-center">Dampak</th>
                        <th className="border-r border-b py-2 px-6 min-w-[100px] text-center">Kemungkinan</th>
                    </tr>
                </thead>
                <tbody>
                    {Data.map((data: HasilPemantauanValue, index: number) => (
                        <tr key={data.id_resiko}>
                            <td className="border-b border-cyan-600 px-6 py-4 text-center">{index + 1}</td>
                            <td className="border border-cyan-600 px-6 py-4">{data.nama_pemilik_resiko || "-"}</td>
                            <td className="border border-cyan-600 px-6 py-4 text-center">
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
                                        onClick={() => {
                                            AlertVerifikasi("Verifikasi", "masukkan keterangan", "question", "Verifikasi", "Tolak", "Batal").then((result) => {
                                                if(result.isConfirmed){
                                                    handleVerifikasi(data.id_resiko, result?.value.keterangan);
                                                } else if(result.isDenied){
                                                    handleVerifikasi(data.id_resiko, result?.value.keterangan);
                                                }
                                            })
                                        }}
                                    >
                                        <TbCircleCheck />
                                        Verifikasi
                                    </ButtonSkyBorder>
                                </div>
                            </td>
                            <td className="border border-cyan-600 px-6 py-4">{data.id_resiko || "-"}</td>
                            <td className="border border-cyan-600 px-6 py-4">{data.resiko_kecurangan_yang_dimitigasi || "-"}</td>
                            <td className="border border-cyan-600 px-6 py-4 text-center">{data.bentuk_kegiatan_pengendalian || "-"}</td>
                            <td className="border border-cyan-600 px-6 py-4 text-center">{data.dampak || "-"}</td>
                            <td className="border border-cyan-600 px-6 py-4 text-center">{data.kemungkinan || "-"}</td>
                            <td className="border border-cyan-600 px-6 py-4 text-center">{data.tingkat_resiko || "-"}</td>
                            <td className="border border-cyan-600 px-6 py-4 text-center">{data.level_resiko || "-"}</td>
                            <td className="border border-cyan-600 px-6 py-4">{data.catatan || "-"}</td>
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
            <ModalHasilPemantauan
                isOpen={ModalOpen}
                onClose={handleModal}
                data={DataToEdit}
            />
        </div>
    )
}

export default Table;