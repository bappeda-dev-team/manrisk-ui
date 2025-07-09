'use client'

import { ButtonGreenBorder, ButtonSkyBorder } from "@/components/global/button";
import { TbPencil, TbCircleCheck } from "react-icons/tb";
import { useState } from "react";
import { ModalHasilPemantauan } from "./ModalHasilPemantauan";
import { Status } from "@/components/page/Status";
import { AlertVerifikasi } from "@/components/global/alert/sweetAlert2";
import { LoadingClock } from "@/components/global/loading";
import { ErrorMessage } from "@/components/page/Error";
import { toast } from "react-toastify";
import { useBrandingContext } from "@/components/context/BrandingContext";
import { useGet } from "@/hook/useGet";
import { useVerifikasi } from "@/hook/useVerifikasi";
import { ApiResponse, HasilPemantauanFraudValue, VerifikasiFormValue } from "@/app/types";

const Table = () => {

    const { branding } = useBrandingContext();
    const tahun = branding.tahun ? branding?.tahun.value : 0;
    const [JenisModal, setJenisModal] = useState<"baru" | "edit" | "">('');
    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [DataToEdit, setDataToEdit] = useState<any>(null);
    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);

    const { Data: HasilData, Loading, Error } = useGet<ApiResponse<HasilPemantauanFraudValue[]>>({
        url: `${branding.api_manrisk}/hasil-pemantauan/get-all-data/${branding.nip}/${tahun}`,
        fetchTrigger: FetchTrigger,
    });
    const data = HasilData?.data || [];

    const handleModal = (jenis: "baru" | "edit" | "", data?: HasilPemantauanFraudValue) => {
        if (ModalOpen) {
            setModalOpen(false);
            setDataToEdit(null);
            setJenisModal("");
        } else {
            setModalOpen(true);
            setDataToEdit(data);
            setJenisModal(jenis);
        }
    }
    const [
        triggerVerifikasi,
        { proses, error: ErrorVerifikasi, message },
    ] = useVerifikasi<VerifikasiFormValue, { message: string; verifikasiId: string }>(
        'hasil-pemantauan'
    );

    const handleVerifikasi = async (id: string, status: string, keterangan: string, dataRekin: HasilPemantauanFraudValue) => {
        const formData: VerifikasiFormValue = {
            status: status,
            keterangan: keterangan || "",
            nip_verifikator: branding.nip,
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
        } else if (ErrorVerifikasi) {
            toast.error(`${message || "gagal verifikasi"}`);
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
        <div className="overflow-auto mt-2 rounded-t-lg border border-cyan-600">
            <table className="w-full">
                <thead>
                    <tr className="text-white bg-cyan-600">
                        <th rowSpan={2} className="border-r border-b py-4 px-6 min-w-[50px] text-center">No</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 min-w-[200px] text-center">Pemilik Risiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 min-w-[100px] text-center">Aksi</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 min-w-[150px] text-center">ID Risiko</th>
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
                    {data.length === 0 ?
                        <tr>
                            <td className="px-6 py-3 uppercase" colSpan={12}>
                                Data Kosong / Belum Ditambahkan
                            </td>
                        </tr>
                        :
                        data.map((data: HasilPemantauanFraudValue, index: number) => (
                            <tr key={data.id_rencana_kinerja}>
                                <td className="border-b border-cyan-600 px-6 py-4 text-center">{index + 1}</td>
                                <td className="border border-cyan-600 px-6 py-4">{data.nama_pegawai || "-"}</td>
                                <td className="border border-cyan-600 px-6 py-4 text-center">
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
                                <td className="border border-cyan-600 px-6 py-4">{data.id_rencana_kinerja || "-"}</td>
                                <td className="border border-cyan-600 px-6 py-4">{data.risiko_kecurangan || "-"}</td>
                                <td className="border border-cyan-600 px-6 py-4 text-center">{data.deskripsi_kegiatan_pengendalian || "-"}</td>
                                <td className="border border-cyan-600 px-6 py-4 text-center">{data.skala_dampak || "-"}</td>
                                <td className="border border-cyan-600 px-6 py-4 text-center">{data.skala_kemungkinan || "-"}</td>
                                <td className="border border-cyan-600 px-6 py-4 text-center">{data.tingkat_risiko || "-"}</td>
                                <td className="border border-cyan-600 px-6 py-4 text-center">{data.level_risiko || "-"}</td>
                                <td className="border border-cyan-600 px-6 py-4">{data.catatan || "-"}</td>
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
                <ModalHasilPemantauan
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