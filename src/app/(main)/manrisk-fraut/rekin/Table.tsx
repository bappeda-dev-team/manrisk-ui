'use client'
import { useState } from "react";
import { toast } from "react-toastify";
import { ButtonRedBorder, ButtonGreenBorder } from "@/components/global/button";
import { AlertQuestion } from "@/components/global/alert/sweetAlert2";
import { TbCircleCheck,TbCreativeCommonsSa  } from "react-icons/tb";

const Data = [
    {
        "id_rekin": "REKIN-392",
        "nama_rencana_kinerja": "Kegiatan Beasiswa Mahasiswa",
        "pemilik_rencana_kinerja": "Budi Perkasa",
        "nip": "08347082374807",
        "jabatan": "Kepala Sekretaris Daerah",
    },
    {
        "id_rekin": "REKIN-393",
        "nama_rencana_kinerja": "Kegiatan Pembagian Dana BANSOS Desa",
        "pemilik_rencana_kinerja": "Andi Siregar",
        "nip": "0257027305",
        "jabatan": "Kepala Dinas Sosial",
    },
    {
        "id_rekin": "REKIN-394",
        "nama_rencana_kinerja": "Pemasangan Tempat Sampah di Jalan Ahmad Yani",
        "pemilik_rencana_kinerja": "Deni Susilo",
        "nip": "4852704857",
        "jabatan": "Kepala Dinas Lingkungan Hidup",
    }
]

export const Table = () => {
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
                    {Data.map((data: any, index: number) => (
                        <tr key={data.id_rekin}>
                            <td className="border-b border-green-500 px-6 py-4 text-center">{index + 1}</td>
                            <td className="border border-green-500 px-6 py-4">{data.nama_rencana_kinerja || "-"}</td>
                            <td className="border border-green-500 px-6 py-4 text-center">{data.pemilik_rencana_kinerja || "-"}</td>
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
                                                if(result.isConfirmed){
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