'use client'

import { useGet } from "@/hook/useGet";
import { ApiResponse, OpdResponse } from "@/app/types";
import { LoadingClock } from "@/components/global/loading";
import { ErrorMessage } from "@/components/page/Error";
import { useBrandingContext } from "@/components/context/BrandingContext";

export const Table = () => {

    const {branding} = useBrandingContext();
    const url_manrisk = branding.api_manrisk;

    const { Data: HasilData, Loading, Error } = useGet<ApiResponse<OpdResponse[]>>({ url: `${url_manrisk}/api/external/opdlist`});
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
                        <th className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px]">Alamat</th>
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
                                <td className="border border-green-500 px-6 py-4">{data.nama_opd || "-"} ({data.singkatan || "-"})</td>
                                <td className="border border-green-500 px-6 py-4 text-center">{data.kode_opd || "-"}</td>
                                <td className="border border-green-500 px-6 py-4 text-center">{data.alamat || "-"}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}