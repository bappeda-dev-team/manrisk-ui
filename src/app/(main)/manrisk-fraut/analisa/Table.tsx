'use client'

import { ButtonGreenBorder, ButtonSkyBorder } from "@/components/global/button";
import { TbPencil, TbCircleCheck } from "react-icons/tb";
import { ModalAnalisa } from "./ModalAnalisa";
import { useState } from "react";
import { AlertQuestion } from "@/components/global/alert/sweetAlert2";
import { toast } from "react-toastify";

const Table = () => {

    const [ModalOpen, setModalOpen] = useState<boolean>(false);

    const [NamaPemilikResiko, setNamaPemilikResiko] = useState<string>('');
    const [TahapProsesBisnis, setTahapProsesBisnis] = useState<string>('');

    const handleModal = (nama: string, tahap: string) => {
        if (ModalOpen) {
            setNamaPemilikResiko("");
            setTahapProsesBisnis("");
            setModalOpen(false);
        } else {
            setNamaPemilikResiko(nama);
            setTahapProsesBisnis(tahap);
            setModalOpen(true);
        }
    }

    const notifikasiBerhasil = () => {
        toast.success("Berhasil Verifikasi");
    }

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
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Penyebab</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Akibat</th>
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
                    <tr>
                        <td className="border-b border-blue-500 px-6 py-4 text-center">1</td>
                        <td className="border border-blue-500 px-6 py-4">Sekretaris Dinas</td>
                        <td className="border border-blue-500 px-6 py-4 text-center">
                            <div className="flex flex-col gap-2 justify-center">
                                <ButtonGreenBorder
                                    className="flex items-center gap-1"
                                    onClick={() => handleModal("Sekretaris Daerah", "Kegiatan bantuan beasiswa mahasiswa (BBM)")}
                                >
                                    <TbPencil />
                                    Edit
                                </ButtonGreenBorder>
                                <ButtonSkyBorder
                                    className="flex items-center gap-1"
                                    onClick={() => {
                                        AlertQuestion("Verifikasi", "", "question", "Verifikasi", "Batal").then((result) => {
                                            if (result.isConfirmed) {
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
                        <td className="border border-blue-500 px-6 py-4">Kegiatan Bantuan Beasiswa Mahasiswa (BBM)</td>
                        <td className="border border-blue-500 px-6 py-4 text-center">id 2025</td>
                        <td className="border border-blue-500 px-6 py-4">Adanya kerjasama/penyuapan kepada staf/pejabat terkait agar pendaftar mendapat bantuan beasiswa</td>
                        <td className="border border-blue-500 px-6 py-4">Proses pengendalian di lapangan belum sepenuhnya dilaksanakan</td>
                        <td className="border border-blue-500 px-6 py-4">Terjadi ketidaksesuaian terhadap prosedur/aturan dalam pendaftaran penerimaan peserta didik baru</td>
                        <td className="border border-blue-500 px-6 py-4 text-center">3</td>
                        <td className="border border-blue-500 px-6 py-4 text-center">3</td>
                        <td className="border border-blue-500 px-6 py-4 text-center">3</td>
                        <td className="border border-blue-500 px-6 py-4 text-center">Sedang</td>
                        <td className="border border-green-500 px-6 py-4">
                            <div className="flex flex-col gap-2">
                                <p className="flex items-center gap-1 bg-green-500 text-white p-1 border rounded-xl justify-center"><TbCircleCheck /> Terverivikasi</p>
                                <p>Diverifikasi karena sudah pas</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            {ModalOpen &&
                <ModalAnalisa
                    isOpen={ModalOpen}
                    onClose={() => handleModal("", "")}
                    nama_pemilik={NamaPemilikResiko}
                    tahap_proses_bisnis={TahapProsesBisnis}
                />
            }
        </div>
    )
}

export default Table;