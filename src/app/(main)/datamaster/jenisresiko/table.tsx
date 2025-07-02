'use client'

import { useState } from "react";
import { toast } from "react-toastify";
import { ButtonRedBorder, ButtonGreenBorder, ButtonSkyBorder } from "@/components/global/button";
import { AlertQuestion } from "@/components/global/alert/sweetAlert2";
import { TbCircleCheck, TbCreativeCommonsSa, TbCirclePlus } from "react-icons/tb";
import { useGet } from "@/hook/useGet";
import { ApiResponse, RisikoResponse } from "@/app/types";
import { LoadingClock } from "@/components/global/loading";
import { ErrorMessage } from "@/components/page/Error";
import { ModalJenisRisiko } from "./ModalJenisRisiko";
import { useApiUrlContext } from "@/components/context/ApiUrlContext";

export const Table = () => {

    const { url_manrisk } = useApiUrlContext();
    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);
    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [DataToEdit, setDataToEdit] = useState<RisikoResponse | null>(null);
    const [JenisModal, setJenisModal] = useState<"baru" | "edit" | "">('');

    const handleModal = (jenis: "baru" | "edit" | "", data?: RisikoResponse) => {
        if (ModalOpen) {
            setModalOpen(false);
            setJenisModal('');
            setDataToEdit(null)
        } else {
            setModalOpen(true);
            setJenisModal(jenis);
            if (data) {
                setDataToEdit(data);
            }
        }
    }

    const { Data: RisikoData, Loading, Error } = useGet<ApiResponse<RisikoResponse[]>>({ url: `${url_manrisk}/risiko-kecurangan`, fetchTrigger: FetchTrigger });
    const data = RisikoData?.data || [];

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
        <>
            <div>
                <ButtonSkyBorder
                    className="flex items-center justify-center gap-2"
                    onClick={() => handleModal("baru")}
                >
                    <TbCirclePlus />
                    Tambah Jenis Risiko
                </ButtonSkyBorder>
            </div>
            <div className="overflow-auto rounded-t-lg border border-green-500">
                <table className="w-full">
                    <thead>
                        <tr className="text-white bg-green-500">
                            <th className="border-r border-b py-4 px-6 border-gray-300 max-w-[50px] text-center">No</th>
                            <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Jenis Risiko</th>
                            <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[400px] text-center">Uraian</th>
                            <th className="border-r border-b py-4 px-6 border-gray-300 max-w-[150px] text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ?
                            <tr>
                                <td className="px-6 py-3 uppercase" colSpan={4}>
                                    Data Kosong / Belum Ditambahkan
                                </td>
                            </tr>
                            :
                            data.map((data: any, index: number) => (
                                <tr key={index}>
                                    <td className="border-b border-green-500 px-6 py-4 text-center">{index + 1}</td>
                                    <td className="border border-green-500 px-6 py-4">{data.jenis_risiko || "-"}</td>
                                    <td className="border border-green-500 px-6 py-4 text-center">{data.uraian || "-"}</td>
                                    <td className="border border-green-500 px-6 py-4 text-center">
                                        <div className="flex flex-col gap-2 justify-center">
                                            <ButtonGreenBorder
                                                className="flex items-center gap-1"
                                                onClick={() => handleModal("edit", data)}
                                            >
                                                <TbCircleCheck />
                                                Edit
                                            </ButtonGreenBorder>
                                            <ButtonRedBorder
                                                className="flex items-center gap-1"
                                                onClick={() => {
                                                    AlertQuestion("Batalkan Pilihan", "Dengan dibatalkan, manrisk fraud yang sudah terisi akan terhapus", "warning", "Hapus", "Batal").then((result) => {
                                                        if (result.isConfirmed) {
                                                            toast.success("Berhasil menghapus pilihan rencana kinerja");
                                                        }
                                                    })
                                                }}
                                            >
                                                <TbCreativeCommonsSa />
                                                Hapus
                                            </ButtonRedBorder>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {ModalOpen &&
                    <ModalJenisRisiko
                        isOpen={ModalOpen}
                        onClose={() => handleModal("")}
                        jenis={JenisModal}
                        data={DataToEdit}
                        onSuccess={() => setFetchTrigger((prev) => !prev)}
                    />
                }
            </div>
        </>
    )
}