'use client'

import { ButtonGreenBorder, ButtonSkyBorder } from "@/components/global/button";
import { TbPencil, TbCircleCheck } from "react-icons/tb";
import { ModalIdentifikasi } from "./ModalIdentifikasi";
import React, { useState } from "react";
import { AlertVerifikasi } from "@/components/global/alert/sweetAlert2";
import { toast } from 'react-toastify';
import { Status } from "@/components/page/Status";
import { getIdentifikasiAll } from "./hook/hookIdentifikasi";
import { LoadingClock } from "@/components/global/loading";
import { ErrorMessage } from "@/components/page/Error";
import { useVerifikasi } from "../hookVerifikasi";

interface IdentifikasiValue {
    id: number,
    id_rencana_kinerja: string;
    id_pohon: number,
    nama_pohon: string;
    level_pohon: number,
    nama_rencana_kinerja: string;
    tahun: string;
    status_rencana_kinerja: string;
    pegawai_id: string;
    nama_pegawai: string;
    operasional_daerah: {
        kode_opd: string;
        nama_opd: string;
    },
    nama_risiko: string;
    jenis_risiko: string;
    kemungkinan_kecurangan: string;
    indikasi: string;
    kemungkinan_pihak_terkait: string;
    status: string;
    keterangan: string;
    pembuat: {
        nama: string;
        nip: string;
        golongan: string;
    },
    verifikator: {
        nama: string;
        nip: string;
        golongan: string;
    },
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
    const [JenisModal, setJenisModal] = useState<"baru" | "edit" | "">('');
    const [DataToEdit, setDataToEdit] = useState<any>(null);
    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);

    const { Identifikasi, Loading, Error } = getIdentifikasiAll('akun_test_level_3', FetchTrigger);

    const handleModal = (jenis: "baru" | "edit" | "", data?: IdentifikasiValue) => {
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

    const [triggerVerifikasi, { data, proses, error, message }] = useVerifikasi<VerifikasiValue, { message: string, verifikasiId: string }>('identifikasi');

    const handleVerifikasi = async (id: string, status: string, keterangan: string, dataRekin: IdentifikasiValue) => {
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
        // console.log(formData);

        const success = await triggerVerifikasi(id, formData);

        if (success) {
            toast.success("Berhasil Verifikasi Data");
            setFetchTrigger((prev) => !prev);
        } else {
            toast.error(`${message}`);
        }
    };

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
                    {Identifikasi.length === 0 ?
                        <tr>
                            <td className="px-6 py-3 uppercase" colSpan={13}>
                                Data Kosong / Belum Ditambahkan
                            </td>
                        </tr>
                        :
                        Identifikasi.map((data: IdentifikasiValue, index: number) => (
                            <tr key={data.id_rencana_kinerja || index}>
                                <td className="border-b border-green-500 px-6 py-4 text-center">{index + 1}</td>
                                <td className="border border-green-500 px-6 py-4">{data.nama_pegawai || "-"}</td>
                                <td className="border border-green-500 px-6 py-4 text-center">
                                    <div className="flex flex-col gap-2 justify-center">
                                        <ButtonGreenBorder
                                            className="flex items-center gap-1"
                                            onClick={() => {
                                                if (data.id) {
                                                    handleModal("edit", data);
                                                } else {
                                                    handleModal("baru", data);
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
                                <td className="border border-green-500 px-6 py-4">{data.nama_rencana_kinerja || "-"}</td>
                                <td className="border border-green-500 px-6 py-4 text-center">{data.id_rencana_kinerja || "-"}</td>
                                <td className="border border-green-500 px-6 py-4">pohon tactical</td>
                                <td className="border border-green-500 px-6 py-4">{data.nama_risiko || "-"}</td>
                                <td className="border border-green-500 px-6 py-4">{data.jenis_risiko || "-"}</td>
                                <td className="border border-green-500 px-6 py-4">{data.kemungkinan_kecurangan || "-"}</td>
                                <td className="border border-green-500 px-6 py-4">{data.indikasi || "-"}</td>
                                <td className="border border-green-500 px-6 py-4">{data.kemungkinan_pihak_terkait || "-"}</td>
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
                <ModalIdentifikasi
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