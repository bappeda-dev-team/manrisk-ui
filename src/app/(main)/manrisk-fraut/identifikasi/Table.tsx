'use client'

import { ButtonGreenBorder, ButtonSkyBorder } from "@/components/global/button";
import { TbPencil, TbCircleCheck } from "react-icons/tb";
import { ModalIdentifikasi } from "./ModalIdentifikasi";
import React, { useState } from "react";
import { AlertVerifikasi } from "@/components/global/alert/sweetAlert2";
import { toast } from 'react-toastify';
import { Status } from "@/components/page/Status";

interface OptionTypeString {
    value: string;
    label: string;
}

interface IdentifikasiValue {
    id_resiko: number;
    pemilik_resiko: string;
    tahap_proses_bisnis: string;
    strategi: string;
    nama_resiko_fraud: string;
    jenis_resiko: OptionTypeString;
    kemungkinan_skenario_kecurangan: string;
    gejala_indikasi: string;
    kemungkinan_pihak_terkait: string;
    status: string;
    keterangan_status: string;
}

const Table = () => {

    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [DataToEdit, setDataToEdit] = useState<any>(null);

    const Data = [
        {
            id_resiko: 1,
            pemilik_resiko: 'Sekretaris Daerah',
            tahap_proses_bisnis: 'Kegiatan Beasiswa Mahasiswa (BBM)',
            strategi: 'Pelaksanaan pendaftaran bantuan beasiswa mahasiswa (BBM)',
            nama_resiko_fraud: 'Adanya kerjasama/penyuapan kepada staf/pejabat terkait agar pendaftar mendapat bantuan beasiswa',
            jenis_resiko: {
                value: 'penyuapan',
                label: 'penyuapan'
            },
            kemungkinan_skenario_kecurangan: 'Penerima bantuan ada hubungan kekerabatan, pertemanan dan lain-lain',
            gejala_indikasi: 'Hal-hal yang tidak sesuai dengan peraturan/ ketentuan',
            kemungkinan_pihak_terkait: 'Staff Terkait & PPTK',
            status: 'disetujui',
            catatan_status: 'Sesuai dengan SOP'
        },
        {
            id_resiko: 2,
            pemilik_resiko: 'Dinas Sosial',
            tahap_proses_bisnis: 'Kegiatan Pembagian dana BANSOS desa',
            strategi: 'Pelaksanaan bersih desa setiap triwulan',
            nama_resiko_fraud: 'Adanya kerjasama/penyuapan kepada staf/pejabat terkait agar peserta mendapatkan dana lebih',
            jenis_resiko: {
                value: 'penyuapan',
                label: 'penyuapan'
            },
            kemungkinan_skenario_kecurangan: 'Penerima bantuan ada hubungan kekerabatan, pertemanan dan lain-lain',
            gejala_indikasi: 'Hal-hal yang tidak sesuai dengan peraturan/ ketentuan',
            kemungkinan_pihak_terkait: 'Staff Terkait & PPTK',
            status: 'ditolak',
            catatan_status: 'Koreksi Kegiatan kecil yang dilaksanakan'
        },
        {
            id_resiko: 3,
            pemilik_resiko: 'Dinas Lingkungan Hidup',
            tahap_proses_bisnis: 'Pemasangan Tempat Sampah di jalan Ahmad yani ',
            strategi: '',
            nama_resiko_fraud: '',
            jenis_resiko: {
                value: '',
                label: ''
            },
            kemungkinan_skenario_kecurangan: '',
            gejala_indikasi: '',
            kemungkinan_pihak_terkait: '',
            status: 'pending',
            catatan_status: ''
        }
    ];

    const handleModal = (data?: IdentifikasiValue) => {
        if (ModalOpen) {
            setModalOpen(false);
            setDataToEdit(null);
        } else {
            setModalOpen(true);
            setDataToEdit(data);
        }
    }
    const handleVerifikasi = (id: number, k: string) => {
        const payload = {
            id: id,
            keterangan: k,
        };
        console.log(payload);
        toast.success("Dokumen berhasil diverifikasi!");
    }

    return (
        <div className="overflow-auto mt-2 rounded-t-lg border border-green-500">
            <table className="w-full">
                <thead>
                    <tr className="text-white bg-green-500">
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[50px] text-center">No</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Pemilik Risiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[100px] text-center">Aksi</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Tahap Proses Bisnis</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[150px] text-center">ID Risiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Strategi/Program Unit Kerja</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Nama Risiko Fraut</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Jenis Risiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Kemungkinan Skenario Kecurangan</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Gejala / Indikasi</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Kemungkinan Pihak Terkait</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[250px] text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {Data.map((data: any, index: number) => (
                        <tr key={data.id_resiko}>
                            <td className="border-b border-green-500 px-6 py-4 text-center">{index + 1}</td>
                            <td className="border border-green-500 px-6 py-4">{data.pemilik_resiko}</td>
                            <td className="border border-green-500 px-6 py-4 text-center">
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
                                                if (result.isConfirmed) {
                                                    handleVerifikasi(data.id_resiko, result?.value.keterangan);
                                                } else if (result.isDenied) {
                                                    toast.success("Berhasi Ditolak");
                                                }
                                            })
                                        }}
                                    >
                                        <TbCircleCheck />
                                        Verifikasi
                                    </ButtonSkyBorder>
                                </div>
                            </td>
                            <td className="border border-green-500 px-6 py-4">{data.tahap_proses_bisnis}</td>
                            <td className="border border-green-500 px-6 py-4 text-center">{data.id_resiko}</td>
                            <td className="border border-green-500 px-6 py-4">{data.strategi || "-"}</td>
                            <td className="border border-green-500 px-6 py-4">{data.nama_resiko_fraud || "-"}</td>
                            <td className="border border-green-500 px-6 py-4">{data.jenis_resiko?.label || "-"}</td>
                            <td className="border border-green-500 px-6 py-4">{data.kemungkinan_skenario_kecurangan || "-"}</td>
                            <td className="border border-green-500 px-6 py-4">{data.gejala_indikasi || "-"}</td>
                            <td className="border border-green-500 px-6 py-4">{data.kemungkinan_pihak_terkait || "-"}</td>
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
            <ModalIdentifikasi
                isOpen={ModalOpen}
                onClose={handleModal}
                data={DataToEdit}
            />
        </div>
    )
}

export default Table;