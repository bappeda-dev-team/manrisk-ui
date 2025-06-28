'use client'

import { ButtonGreenBorder, ButtonSkyBorder } from "@/components/global/button";
import { TbPencil, TbCircleCheck } from "react-icons/tb";
import { useState } from "react";
import { ModalPenanganan } from "./ModalPenanganan";
import { AlertVerifikasi } from "@/components/global/alert/sweetAlert2";
import { toast } from "react-toastify";
import { Status } from "@/components/page/Status";
import { getPenangananAll } from "./hook/hookPenanganan";
import { LoadingClock } from "@/components/global/loading";
import { ErrorMessage } from "@/components/page/Error";
import { useVerifikasi } from "../hookVerifikasi";

interface PenangananValue {
    id: number;
    id_rencana_kinerja: string;
    id_pohon: number;
    nama_pohon: string;
    level_pohon: number;
    nama_rencana_kinerja: string;
    tahun: string;
    status_rencana_kinerja: string;
    pegawai_id: string;
    nama_pegawai: string;
    operasional_daerah: OperasionalDaerah;
    existing_control: string;
    jenis_perlakuan_risiko: string;
    rencana_perlakuan_risiko: string;
    biaya_perlakuan_risiko: string;
    target_waktu: string;
    pic: string;
    status: string;
    keterangan: string;
}
interface OperasionalDaerah {
    kode_opd: string;
    nama_opd: string;
}
interface VerifikasiValue {
    status: string;
    keterangan: string;
    verifikator: {
        nama: string;
        nip: string;
        golongan: string;
    };
}

const Table = () => {

    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);
    const [DataToEdit, setDataToEdit] = useState<any>(null);
    const [JenisModal, setJenisModal] = useState<"baru" | "edit" | "">("");

    const { Penanganan, Loading, Error } = getPenangananAll('akun_test_level_3', FetchTrigger);

    const handleModal = (jenis: "baru" | "edit" | "", data?: PenangananValue) => {
        if (ModalOpen) {
            setModalOpen(false);
            setDataToEdit(null);
            setJenisModal('');
        } else {
            setModalOpen(true);
            setJenisModal(jenis);
            if (data) {
                setDataToEdit(data);
            } else {
                setDataToEdit(null);
            }
        }
    }

    const [
        triggerVerifikasi,
        { data, proses, error, message },
    ] = useVerifikasi<VerifikasiValue, { message: string; verifikasiId: string }>(
        'penanganan'
    );
    const handleVerifikasi = async (id: string, status: string, keterangan: string, dataRekin: PenangananValue) => {
        const formData: VerifikasiValue = {
            status: status,
            keterangan: keterangan || "",
            verifikator: {
                nama: dataRekin.nama_pegawai,
                nip: dataRekin.pegawai_id,
                golongan: '-',
            },
        };
        if (!id) {
            toast.error('ID Verifikasi belum tersedia.');
            return;
        }

        const success = await triggerVerifikasi(id, formData);

        if (success) {
            toast.success("Berhasil Verifikasi Data");
            setFetchTrigger((prev) => !prev);
        } else {
            toast.error(`${message}`);
            console.error(error);
        }
    };
    function formatRupiah(angka: number) {
        if (typeof angka !== 'number') {
            return String(angka); // Jika bukan angka, kembalikan sebagai string
        }
        return angka.toLocaleString('id-ID'); // 'id-ID' untuk format Indonesia
    }

    if (Loading) {
        return (
            <LoadingClock />
        )
    }
    if (Error) {
        return (
            <ErrorMessage />
        )
    }

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
                    {Penanganan.length === 0 ?
                        <tr>
                            <td className="px-6 py-3 uppercase" colSpan={13}>
                                Data Kosong / Belum Ditambahkan
                            </td>
                        </tr>
                        :
                        Penanganan.map((data: PenangananValue, index: number) => (
                            <tr key={data.id_rencana_kinerja || index}>
                                <td className="border-b border-yellow-500 px-6 py-4 text-center">{index + 1}</td>
                                <td className="border border-yellow-500 px-6 py-4">{data.nama_pegawai || "-"}</td>
                                <td className="border border-yellow-500 px-6 py-4 text-center">
                                    <div className="flex flex-col gap-2 justify-center">
                                        <ButtonGreenBorder
                                            className="flex items-center gap-1"
                                            onClick={() => {
                                                if (data.id) {
                                                    handleModal("edit", data)
                                                } else {
                                                    handleModal("baru", data)
                                                }
                                            }}
                                        >
                                            <TbPencil />
                                            Edit
                                        </ButtonGreenBorder>
                                        <ButtonSkyBorder
                                            className="flex items-center gap-1"
                                            onClick={() => {
                                                AlertVerifikasi("Verifikasi", "masukkan keterangan", "question", "Verifikasi", "Tolak", "Batal").then((result) => {
                                                    if (result.isConfirmed) {
                                                        handleVerifikasi(data.id_rencana_kinerja, "APPROVED", result?.value.keterangan, data);
                                                    } else if (result.isDenied) {
                                                        handleVerifikasi(data.id_rencana_kinerja, "REJECTED", result?.value.keterangan, data);
                                                    }
                                                })
                                            }}
                                        >
                                            <TbCircleCheck />
                                            Verifikasi
                                        </ButtonSkyBorder>
                                    </div>
                                </td>
                                <td className="border border-yellow-500 px-6 py-4">{data.nama_rencana_kinerja || "-"}</td>
                                <td className="border border-yellow-500 px-6 py-4 text-center">{data.id_rencana_kinerja || "-"}</td>
                                <td className="border border-yellow-500 px-6 py-4">{data.existing_control || "-"}</td>
                                <td className="border border-yellow-500 px-6 py-4">{data.jenis_perlakuan_risiko}</td>
                                <td className="border border-yellow-500 px-6 py-4">{data.rencana_perlakuan_risiko || "-"}</td>
                                <td className="border border-yellow-500 px-6 py-4">Rp.{formatRupiah(Number(data.biaya_perlakuan_risiko)) || "-"}</td>
                                <td className="border border-yellow-500 px-6 py-4">{data.target_waktu || "-"}</td>
                                <td className="border border-yellow-500 px-6 py-4">{data.pic || "-"}</td>
                                <td className="border border-green-500 px-6 py-4">
                                    <Status
                                        status={data.status}
                                        catatan={data.keterangan}
                                    />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {ModalOpen &&
                <ModalPenanganan
                    isOpen={ModalOpen}
                    onClose={() => handleModal("")}
                    onSuccess={() => setFetchTrigger((prev) => !prev)}
                    data={DataToEdit}
                    jenis={JenisModal}
                />
            }
        </div>
    )
}

export default Table;