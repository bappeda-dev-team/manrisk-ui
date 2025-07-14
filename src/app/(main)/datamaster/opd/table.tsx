'use client'

import { useGet } from "@/hook/useGet";
import { ApiResponse, OpdResponse } from "@/app/types";
import { LoadingClock } from "@/components/global/loading";
import { ErrorMessage } from "@/components/page/Error";
import { useBrandingContext } from "@/components/context/BrandingContext";

export const Table = () => {

    const { api_perencanaan } = useBrandingContext();

    const { Data: HasilData, Loading, Error } = useGet<ApiResponse<OpdResponse[]>>({ url: `${api_perencanaan}/opd/opds` });
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
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px]">Nama Perangkat Daerah</th>
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px]">Kode OPD</th>
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
                        data.map((data: OpdResponse, index: number) => (
                            <tr key={index}>
                                <td className="border-b border-green-500 px-6 py-4 text-center">{index + 1}</td>
                                <td className="border border-green-500 px-6 py-4">{data.namaOpd || "-"}</td>
                                <td className="border border-green-500 px-6 py-4 text-center">{data.kodeOpd || "-"}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
