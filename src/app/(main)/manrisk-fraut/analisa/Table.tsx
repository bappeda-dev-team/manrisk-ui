'use client'

import { ButtonGreenBorder, ButtonSkyBorder } from "@/components/global/button";
import { TbPencil, TbCircleCheck } from "react-icons/tb";
import { ModalAnalisa } from "./ModalAnalisa";
import { useState } from "react";
import { AlertVerifikasi } from "@/components/global/alert/sweetAlert2";
import { toast } from "react-toastify";
import { Status } from "@/components/page/Status";
import { LoadingClock } from "@/components/global/loading";
import { ErrorMessage } from "@/components/page/Error";
import { useGet } from "@/hook/useGet";
import { useVerifikasi } from "@/hook/useVerifikasi";
import { ApiResponse, VerifikasiFormValue, AnalisaFraudValue } from "@/app/types";
import { useBrandingContext } from "@/components/context/BrandingContext";
import { useApiUrlContext } from "@/components/context/ApiUrlContext";

const Table = () => {

    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [JenisModal, setJenisModal] = useState<"baru" | "edit" | "">('');
    const [Nip, setNip] = useState<string>("");
    const [DataToEdit, setDataToEdit] = useState<any>(null);
    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);
    const {branding} = useBrandingContext();
    const tahun = branding?.tahun ? branding?.tahun.value : 0;
    const { url_manrisk } = useApiUrlContext();

    const { Data: HasilData, Loading, Error } = useGet<ApiResponse<AnalisaFraudValue[]>>({url: `${url_manrisk}/analisa/get-all-data/${branding.nip}/${tahun}`, fetchTrigger: FetchTrigger});
    const Analisa = HasilData?.data || [];

    const handleModal = (jenis: "baru" | "edit" | "", data?: AnalisaFraudValue) => {
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
        { proses, error: ErrorVerifikasi, message },
    ] = useVerifikasi<VerifikasiFormValue, { message: string; verifikasiId: string }>(
        'analisa'
    );

    const handleVerifikasi = async (id: string, status: string, keterangan: string, dataRekin: AnalisaFraudValue) => {
        const formData: VerifikasiFormValue = {
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
        } else if(ErrorVerifikasi){
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
        <div className="overflow-auto mt-2 rounded-t-lg border border-blue-500">
            <table className="w-full">
                <thead>
                    <tr className="text-white bg-blue-500">
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[50px] text-center">No</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Pemilik Risiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[100px] text-center">Aksi</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Tahap Proses Bisnis</th>
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
                    {Analisa.length === 0 ?
                        <tr>
                            <td className="px-6 py-3 uppercase" colSpan={13}>
                                Data Kosong / Belum Ditambahkan
                            </td>
                        </tr>
                        :
                        Analisa.map((data: AnalisaFraudValue, index: number) => (
                            <tr key={data.id_rencana_kinerja || index}>
                                <td className="border-b border-blue-500 px-6 py-4 text-center">{index + 1}</td>
                                <td className="border border-blue-500 px-6 py-4">{data.nama_pegawai || "-"}</td>
                                <td className="border border-blue-500 px-6 py-4 text-center">
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
                                                });
                                            }}
                                        >
                                            <TbCircleCheck />
                                            Verifikasi
                                        </ButtonSkyBorder>
                                    </div>
                                </td>
                                <td className="border border-blue-500 px-6 py-4">{data.nama_rencana_kinerja || "-"}</td>
                                <td className="border border-blue-500 px-6 py-4 text-center">{data.id_rencana_kinerja || "-"}</td>
                                <td className="border border-blue-500 px-6 py-4">{data.nama_risiko || "-"}</td>
                                <td className="border border-blue-500 px-6 py-4">{data.penyebab || "-"}</td>
                                <td className="border border-blue-500 px-6 py-4">{data.akibat || "-"}</td>
                                <td className="border border-blue-500 px-6 py-4 text-center">{data.skala_dampak || "-"}</td>
                                <td className="border border-blue-500 px-6 py-4 text-center">{data.skala_kemungkinan || "-"}</td>
                                <td className="border border-blue-500 px-6 py-4 text-center">{data.tingkat_risiko || "-"}</td>
                                <td className="border border-blue-500 px-6 py-4 text-center">{data.level_risiko || "-"}</td>
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
                <ModalAnalisa
                    jenis={JenisModal}
                    isOpen={ModalOpen}
                    onClose={() => handleModal('')}
                    onSuccess={() => setFetchTrigger((prev) => !prev)}
                    Data={DataToEdit}
                />
            }
        </div>
    )
}

export default Table;