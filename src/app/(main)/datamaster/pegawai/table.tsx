'use client'

import { useGet } from "@/hook/useGet";
import { PerencanaanResponse, PegawaiResponse } from "@/app/types";
import { LoadingClock } from "@/components/global/loading";
import { ErrorMessage } from "@/components/page/Error";
import { useApiUrlContext } from "@/components/context/ApiUrlContext";

export const Table = () => {

    const { token, url_perencanaan, url_manrisk } = useApiUrlContext();

    const { Data: HasilData, Loading, Error } = useGet<PerencanaanResponse<PegawaiResponse[]>>({ url: `${url_perencanaan}/api/v1/perencanaan/pegawai/findall`});
    const data = HasilData?.data || [];

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
        <div className="overflow-auto rounded-t-lg border border-green-500">
            <table className="w-full">
                <thead>
                    <tr className="text-white bg-green-500">
                        <th className="border-r border-b py-4 px-6 border-gray-300 max-w-[50px] text-center">No</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Nama Pegawai</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[400px] text-center">NIP</th>
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
                                <td className="border border-green-500 px-6 py-4">{data.nama_pegawai || "-"}</td>
                                <td className="border border-green-500 px-6 py-4 text-center">{data.nip || "-"}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}