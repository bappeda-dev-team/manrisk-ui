'use client'

import { ButtonGreenBorder, ButtonSkyBorder } from "@/components/global/button";
import { TbPencil, TbCircleCheck } from "react-icons/tb";
import { ModalAnalisa } from "./ModalAnalisa";
import { useState } from "react";
import { AlertQuestion, AlertVerifikasi } from "@/components/global/alert/sweetAlert2";
import { toast } from "react-toastify";
import { Status } from "@/components/page/Status";

interface AnalisaValue {
    id_resiko: number;
    nama_pemilik_resiko: string;
    tahap_proses_bisnis: string;
    nama_resiko_fraud: string;
    penyebab: string;
    akibat: string;
    dampak: number;
    kemungkinan: number;
    tingkat_resiko: number;
    level_resiko: string;
    status: string;
    catatan_status: string;
}

const Table = () => {

    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [DataToEdit, setDataToEdit] = useState<any>(null);

    const handleModal = (data?: AnalisaValue) => {
        if (ModalOpen) {
            setModalOpen(false);
            setDataToEdit(null);
        } else {
            setModalOpen(true);
            if(data){
                setDataToEdit(data);
            } else {
                setDataToEdit(null);
            }
        }
    }

    const handleVerifikasi = (keterangan: string) => {
        const DataVerifikasi ={
            keterangan: keterangan
        }
        console.log(DataVerifikasi);
    }

    const Data = [
        {
            id_resiko: 1,
            nama_pemilik_resiko: 'Sekretaris Daerah',
            tahap_proses_bisnis: 'Kegiatan Beasiswa Mahasiswa (BBM)',
            nama_resiko_fraud: 'Adanya kerjasama/penyuapan kepada staf/pejabat terkait agar pendaftar mendapat bantuan beasiswa',
            penyebab: 'Proses pengendalian lapangan belum sepenuhnya dilaksanakan',
            akibat: 'Terjadinya ketidaksesuaian terhadap prosedur/aturan dalam pendaftaran penerimaan peserta didik baru',
            dampak: 3,
            kemungkinan: 3,
            tingkat_resiko: 9,
            level_resiko: "Sedang",
            status: 'disetujui',
            catatan_status: 'Sesuai dengan SOP'
        },
        {
            id_resiko: 2,
            nama_pemilik_resiko: 'Dinas Sosial',
            tahap_proses_bisnis: 'Kegiatan pembagian dana bansos desa',
            nama_resiko_fraud: 'Adanya kerjasama/penyuapan kepada staf/pejabat terkait agar peserta mendapatkan dana lebih',
            penyebab: 'Proses pendataan masyarakat yang layak mendapatkan bantuan tidak optimal',
            akibat: 'Terjadinya ketidaksesuaian terhadap prosedur/aturan dalam Pembagian dana bansos desa',
            dampak: 4,
            kemungkinan: 5,
            tingkat_resiko: 20,
            level_resiko: "Tinggi",
            status: 'ditolak',
            catatan_status: 'Sinkonkan lagi dengan data dispenduk'
        },
        {
            id_resiko: 3,
            nama_pemilik_resiko: 'Dinas Lingkungan Hidup',
            tahap_proses_bisnis: 'Kegiatan pembagian dana bansos desa',
            nama_resiko_fraud: '',
            penyebab: '',
            akibat: '',
            dampak: 0,
            kemungkinan: 0,
            tingkat_resiko: 0,
            level_resiko: "-",
            status: 'pending',
            catatan_status: ''
        }
    ];

    return (
        <div className="overflow-auto mt-2 rounded-t-lg border border-blue-500">
            <table className="w-full">
                <thead>
                    <tr className="text-white bg-blue-500">
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[50px] text-center">No</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Pemilik Risiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[100px] text-center">Aksi</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Tahap Proses Bisnis</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[150px] text-center">ID Risiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Nama Risiko Fraut</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Penyebab</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Akibat</th>
                        <th colSpan={2} className="border-r border-b py-2 px-6 border-gray-300 min-w-[200px] text-center">Skala Risiko Sebelum</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[50px] text-center">Tingkat Risiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[100px] text-center">Level Risiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[250px] text-center">Status</th>
                    </tr>
                    <tr className="text-white bg-blue-700">
                        <th rowSpan={2} className="border-r border-b py-2 px-4 border-gray-300 min-w-[100px] text-center">Dampak</th>
                        <th rowSpan={2} className="border-r border-b py-2 px-4 border-gray-300 min-w-[100px] text-center">Kemungkinan</th>
                    </tr>
                </thead>
                <tbody>
                    {Data.map((data: AnalisaValue, index: number) => (
                        <tr key={data.id_resiko}>
                            <td className="border-b border-blue-500 px-6 py-4 text-center">{index + 1}</td>
                            <td className="border border-blue-500 px-6 py-4">{data.nama_pemilik_resiko || "-"}</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">
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
                                                    handleVerifikasi(result?.value.keterangan);
                                                } else if(result.isDenied) {
                                                    handleVerifikasi(result?.value.keterangan);
                                                }
                                            });
                                        }}
                                    >
                                        <TbCircleCheck />
                                        Verifikasi
                                    </ButtonSkyBorder>
                                </div>
                            </td>
                            <td className="border border-blue-500 px-6 py-4">{data.tahap_proses_bisnis || "-"}</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">{data.id_resiko || "-"}</td>
                            <td className="border border-blue-500 px-6 py-4">{data.nama_resiko_fraud || "-"}</td>
                            <td className="border border-blue-500 px-6 py-4">{data.penyebab || "-"}</td>
                            <td className="border border-blue-500 px-6 py-4">{data.akibat || "-"}</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">{data.dampak || "-"}</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">{data.kemungkinan || "-"}</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">{data.tingkat_resiko || "-"}</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">{data.level_resiko || "-"}</td>
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
            {ModalOpen &&
                <ModalAnalisa
                    isOpen={ModalOpen}
                    onClose={handleModal}
                    data={DataToEdit}
                />
            }
        </div>
    )
}

export default Table;