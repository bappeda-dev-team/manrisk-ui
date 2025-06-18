'use client'

import { ButtonGreenBorder, ButtonSkyBorder } from "@/components/global/button";
import { TbPencil, TbCircleCheck } from "react-icons/tb";
import { useState } from "react";
import { ModalPenanganan } from "./ModalPenanganan";
import { AlertVerifikasi } from "@/components/global/alert/sweetAlert2";
import { toast } from "react-toastify";
import { Status } from "@/components/page/Status";

interface PenangananValue {
    id_resiko: number;
    nama_pemilik_resiko: string;
    tahap_proses_bisnis: string;
    existing_control: string;
    jenis_perlakuan_resiko: string;
    rencana_perlakuan_resiko: string;
    biaya_perlakuan_resiko: number;
    target_waktu: string;
    penanggung_jawab: string;
    status: string;
    catatan_status: string;
}

const Table = () => {

    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [DataToEdit, setDataToEdit] = useState<any>(null);

    const handleModal = (data?: PenangananValue) => {
        if (ModalOpen) {
            setModalOpen(false);
            setDataToEdit(null);
        } else {
            setModalOpen(true);
            setDataToEdit(data);
        }
    }

    const handleVerifikasi = (keterangan: string) => {
        const DataVerifikasi = {
            keterangan: keterangan
        }
        console.log(DataVerifikasi);
        toast.success("Data Diverifikasi");
    }
    function formatRupiah(angka: number) {
        if (typeof angka !== 'number') {
            return String(angka); // Jika bukan angka, kembalikan sebagai string
        }
        return angka.toLocaleString('id-ID'); // 'id-ID' untuk format Indonesia
    }

    const Data = [
        {
            id_resiko: 1,
            nama_pemilik_resiko: 'Sekretaris Daerah',
            tahap_proses_bisnis: 'Kegiatan Beasiswa Mahasiswa (BBM)',
            existing_control: 'Melakukan verifikasi, monitoring dan evaluasi secara bertahap',
            jenis_perlakuan_resiko: 'Mitigasi',
            rencana_perlakuan_resiko: 'Melakukan pengecekan dokumen - dokumen berjenjang',
            biaya_perlakuan_resiko: 2000000,
            target_waktu: "TW II 2025",
            penanggung_jawab: "Kepala Dinas Pendidikan Daerah",
            status: 'disetujui',
            catatan_status: 'Sesuai dengan SOP'
        },
        {
            id_resiko: 2,
            nama_pemilik_resiko: 'Dinas Sosial',
            tahap_proses_bisnis: 'Kegiatan pembagian dana bansos desa',
            existing_control: 'Adanya kerjasama/penyuapan kepada staff/pejabat terkait agar peserta mendapatkan dana lebih',
            jenis_perlakuan_resiko: 'Mitigasi',
            rencana_perlakuan_resiko: 'Melakukan sinkronasi data nominal pemberian dana bansos',
            biaya_perlakuan_resiko: 300000,
            target_waktu: "TW II 2025",
            penanggung_jawab: "Kepala Dinas Sosial",
            status: 'ditolak',
            catatan_status: 'penanggung jawab diberikan kepada kepala bagian sub administrasi'
        },
        {
            id_resiko: 3,
            nama_pemilik_resiko: 'Dinas Lingkungan Hidup',
            tahap_proses_bisnis: 'Pemasangan tempat sampah di jalan ahmad yani',
            existing_control: '-',
            jenis_perlakuan_resiko: '-',
            rencana_perlakuan_resiko: '-',
            biaya_perlakuan_resiko: 0,
            target_waktu: "-",
            penanggung_jawab: "-",
            status: 'pending',
            catatan_status: '-'
        }
    ];

    return (
        <div className="overflow-auto mt-2 rounded-t-lg border border-yellow-500">
            <table className="w-full">
                <thead>
                    <tr className="text-white bg-yellow-500">
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[50px] text-center">No</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Pemilik Risiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[100px] text-center">Aksi</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Tahap Proses Bisnis</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[150px] text-center">ID Risiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Existing Control / Internal Control</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Jenis Perlakuan Risiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Rencana Perlakuan Risiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Biaya Perlakuan Risiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Target Waktu</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Penanggung Jawab (PIC)</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[250px] text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {Data.map((data: PenangananValue, index: number) => (
                        <tr key={data.id_resiko}>
                            <td className="border-b border-yellow-500 px-6 py-4 text-center">{index + 1}</td>
                            <td className="border border-yellow-500 px-6 py-4">{data.nama_pemilik_resiko || "-"}</td>
                            <td className="border border-yellow-500 px-6 py-4 text-center">
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
                                                } else if(result.isDenied){
                                                    handleVerifikasi(result?.value.keterangan);
                                                }
                                            })
                                        }}
                                    >
                                        <TbCircleCheck />
                                        Verifikasi
                                    </ButtonSkyBorder>
                                </div>
                            </td>
                            <td className="border border-yellow-500 px-6 py-4">{data.tahap_proses_bisnis || "-"}</td>
                            <td className="border border-yellow-500 px-6 py-4 text-center">{data.id_resiko || "-"}</td>
                            <td className="border border-yellow-500 px-6 py-4">{data.existing_control || "-"}</td>
                            <td className="border border-yellow-500 px-6 py-4">{data.jenis_perlakuan_resiko}</td>
                            <td className="border border-yellow-500 px-6 py-4">{data.rencana_perlakuan_resiko || "-"}</td>
                            <td className="border border-yellow-500 px-6 py-4">Rp.{formatRupiah(data.biaya_perlakuan_resiko) || "-"}</td>
                            <td className="border border-yellow-500 px-6 py-4">{data.target_waktu || "-"}</td>
                            <td className="border border-yellow-500 px-6 py-4">{data.penanggung_jawab || "-"}</td>
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
            <ModalPenanganan
                isOpen={ModalOpen}
                onClose={handleModal}
                data={DataToEdit}
            />
        </div>
    )
}

export default Table;