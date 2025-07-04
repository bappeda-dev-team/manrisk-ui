'use client'
import { useState } from "react";
import { toast } from "react-toastify";
import { ButtonRedBorder, ButtonGreenBorder } from "@/components/global/button";
import { AlertQuestion } from "@/components/global/alert/sweetAlert2";
import { TbCircleCheck, TbCreativeCommonsSa } from "react-icons/tb";
import { LoadingClock } from "@/components/global/loading";
import { ErrorMessage } from "@/components/page/Error";
import { useGet } from "@/hook/useGet";
import { ApiResponse, RencanaKinerjaValue } from "@/app/types";
import { useBrandingContext } from "@/components/context/BrandingContext";

export const Table = () => {
    const { branding } = useBrandingContext();
    const url_manrisk = branding.api_manrisk;
    const tahun = branding.tahun ? branding?.tahun?.value : 0;

    const { Data: HasilData, Loading, Error } = useGet<ApiResponse<RencanaKinerjaValue[]>>({ url: `${url_manrisk}/api/external/rencana-kinerja/akun_test_level_3/${tahun}` });
    const Rekin = HasilData?.data || [];

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
                        <th className="border-r border-b py-4 px-6 border-gray-300 max-w-[50px] text-center">No</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[500px] text-center">Rencana Kinerja</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Pemilik</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 max-w-[150px] text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {Rekin.map((data: RencanaKinerjaValue, index: number) => (
                        <tr key={index}>
                            <td className="border-b border-green-500 px-6 py-4 text-center">{index + 1}</td>
                            <td className="border border-green-500 px-6 py-4">{data.nama_rencana_kinerja || "-"}</td>
                            <td className="border border-green-500 px-6 py-4 text-center">{data.nama_pegawai || "-"}</td>
                            <td className="border border-green-500 px-6 py-4 text-center">
                                <div className="flex flex-col gap-2 justify-center">
                                    <ButtonGreenBorder
                                        className="flex items-center gap-1"
                                        onClick={() => toast.success("Berhasil Dipilih Untuk Manrisk Fraud")}
                                    >
                                        <TbCircleCheck />
                                        Pilih
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
                                        Batalkan
                                    </ButtonRedBorder>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
} 