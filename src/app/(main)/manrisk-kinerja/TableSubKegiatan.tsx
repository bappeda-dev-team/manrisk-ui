import React from "react";

interface Table {
    jenis: "identifikasi" | "analisa" | "penanganan" | "pemantauan" | "hasil-pemantauan";
    subKegiatan: string;
    indikator: Indikator[];
}
interface Indikator {
    indikator: string;
    target: Target[];
}
interface Target {
    target: string;
    satuan: string;
}

export const TableSubKegiatan:React.FC<Table> = ({ jenis, subKegiatan, indikator }) => {
    return (
        <table className="w-full">
            <tbody 
                className={`border
                    ${jenis === "identifikasi" && "border-green-500"} 
                    ${jenis === "analisa" && "border-blue-500"} 
                    ${jenis === "penanganan" && "border-yellow-500"} 
                    ${jenis === "pemantauan" && "border-gray-700"} 
                    ${jenis === "hasil-pemantauan" && "border-cyan-600"} 
                `}
            >
                <tr>
                    <td className="px-2 py-1">Sub Kegiatan</td>
                    <td>:</td>
                    <td className="px-2 py-1">{subKegiatan || "-"}</td>
                </tr>
                {indikator.map((i: Indikator, index: number) => (
                    <React.Fragment key={index}>
                        <tr>
                            <td className="px-2 py-1">Indikator</td>
                            <td>:</td>
                            <td className="px-2 py-1">{i.indikator || "-"}</td>
                        </tr>
                        {i.target.map((t: Target, sub_index: number) => (
                            <tr key={sub_index}>
                                <td className="px-2 py-1">Target/Satuan</td>
                                <td>:</td>
                                <td className="px-2 py-1">{t.target || "-"} / {t.satuan || "-"}</td>
                            </tr>
                        ))}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    )
} 