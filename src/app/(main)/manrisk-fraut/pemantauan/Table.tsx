'use client'

import { ButtonGreenBorder, ButtonSkyBorder } from "@/components/global/button";
import { TbPencil, TbCircleCheck } from "react-icons/tb";
import { useState } from "react";
import { ModalPemantauan } from "./ModalPemantauan";
import { Status } from "@/components/page/Status";
import { AlertVerifikasi } from "@/components/global/alert/sweetAlert2";
import { toast } from "react-toastify";
import { getPemantauanAll } from "./hook/hookPemantauan";
import { LoadingClock } from "@/components/global/loading";
import { ErrorMessage } from "@/components/page/Error";
import { useVerifikasi } from "../hookVerifikasi";

interface PemantauanValue {
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
    pemilik_risiko: string;
    risiko_kecurangan: string;
    deskripsi_kegiatan_pengendalian: string;
    pic: string;
    rencana_waktu_pelaksanaan: string;
    realisasi_waktu_pelaksanaan: string;
    progres_tindak_lanjut: string;
    bukti_pelaksanaan_tindak_lanjut: string;
    kendala: string;
    catatan: string;
    status: string;
    keterangan: string;
    pembuat: PembuatVerifikator;
    verifikator: PembuatVerifikator;
}
interface PembuatVerifikator {
    nama: string;
    nip: string;
    golongan: string;
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

    const { Pemantauan, Loading, Error } = getPemantauanAll('akun_test_level_3', FetchTrigger);

    const handleModal = (jenis: "baru" | "edit" | "", data?: PemantauanValue) => {
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
        'pemantauan'
    );
    const handleVerifikasi = async (id: string, status: string, keterangan: string, dataRekin: PemantauanValue) => {
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
        <div className="overflow-auto mt-2 rounded-t-lg border border-gray-700">
            <table className="w-full">
                <thead>
                    <tr className="text-white bg-gray-700">
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[50px] text-center">No</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Pemilik Risiko</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[100px] text-center">Aksi</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[150px] text-center">ID Risiko</th>
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
                    {Pemantauan.length === 0 ?
                        <tr>
                            <td className="px-6 py-3 uppercase" colSpan={13}>
                                Data Kosong / Belum Ditambahkan
                            </td>
                        </tr>
                        :
                        Pemantauan.map((data: PemantauanValue, index: number) => (
                            <tr key={data.id_rencana_kinerja || index}>
                                <td className="border-b border-gray-700 px-6 py-4 text-center">{index + 1}</td>
                                <td className="border border-gray-700 px-6 py-4">{data.nama_pegawai || "-"}</td>
                                <td className="border border-gray-700 px-6 py-4 text-center">
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
                                <td className="border border-gray-700 px-6 py-4">{data.id_rencana_kinerja || "-"}</td>
                                <td className="border border-gray-700 px-6 py-4">{data.risiko_kecurangan || "-"}</td>
                                <td className="border border-gray-700 px-6 py-4 text-center">{data.deskripsi_kegiatan_pengendalian || "-"}</td>
                                <td className="border border-gray-700 px-6 py-4">{data.pic || "-"}</td>
                                <td className="border border-gray-700 px-6 py-4">{data.rencana_waktu_pelaksanaan || "-"}</td>
                                <td className="border border-gray-700 px-6 py-4">{data.realisasi_waktu_pelaksanaan || "-"}</td>
                                <td className="border border-gray-700 px-6 py-4 text-center">{data.progres_tindak_lanjut || "-"}</td>
                                <td className="border border-gray-700 px-6 py-4">{data.bukti_pelaksanaan_tindak_lanjut || "-"}</td>
                                <td className="border border-gray-700 px-6 py-4">{data.kendala || "-"}</td>
                                <td className="border border-gray-700 px-6 py-4">{data.catatan || "-"}</td>
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
                <ModalPemantauan
                    isOpen={ModalOpen}
                    jenis={JenisModal}
                    onSuccess={() => setFetchTrigger((prev) => !prev)}
                    onClose={() => handleModal("")}
                    data={DataToEdit}
                />
            }
        </div>
    )
}

export default Table;