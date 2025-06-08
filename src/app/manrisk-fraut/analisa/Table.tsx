import { ButtonGreenBorder, ButtonSkyBorder } from "@/components/global/button";
import { TbPencil, TbCircleCheck } from "react-icons/tb";

const Table = () => {
    return (
        <div className="overflow-auto mt-2 rounded-t-lg border border-blue-500">
            <table className="w-full">
                <thead>
                    <tr className="text-white bg-blue-500">
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[50px] text-center">No</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Pemilik Resiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[100px] text-center">Aksi</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Tahap Proses Bisnis</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[150px] text-center">ID Resiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[300px] text-center">Nama Resiko Fraut</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Penyebab</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[200px] text-center">Akibat</th>
                        <th colSpan={2} className="border-r border-b py-2 px-6 border-gray-300 min-w-[200px] text-center">Skala Resiko Sebelum</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[50px] text-center">Tingkat Resiko</th>
                        <th rowSpan={2} className="border-r border-b py-4 px-6 border-gray-300 min-w-[100px] text-center">Level Resiko</th>
                    </tr>
                    <tr className="text-white bg-blue-700">
                        <th rowSpan={2} className="border-r border-b py-2 px-4 border-gray-300 min-w-[100px] text-center">Dampak</th>
                        <th rowSpan={2} className="border-r border-b py-2 px-4 border-gray-300 min-w-[100px] text-center">Kemungkinan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border-b border-blue-500 px-6 py-4 text-center">1</td>
                        <td className="border border-blue-500 px-6 py-4">Sekretaris Dinas</td>
                        <td className="border border-blue-500 px-6 py-4 text-center">
                            <div className="flex flex-col gap-2 justify-center">
                                <ButtonGreenBorder
                                    className="flex items-center gap-1"
                                >
                                    <TbPencil />
                                    Edit
                                </ButtonGreenBorder>
                                <ButtonSkyBorder
                                    className="flex items-center gap-1"
                                >
                                    <TbCircleCheck />
                                    Verifikasi
                                </ButtonSkyBorder>
                            </div>
                        </td>
                        <td className="border border-blue-500 px-6 py-4">Kegiatan Bantuan Beasiswa Mahasiswa (BBM)</td>
                        <td className="border border-blue-500 px-6 py-4 text-center">id 2025</td>
                        <td className="border border-blue-500 px-6 py-4">Adanya kerjasama/penyuapan kepada staf/pejabat terkait agar pendaftar mendapat bantuan beasiswa</td>
                        <td className="border border-blue-500 px-6 py-4">Proses pengendalian di lapangan belum sepenuhnya dilaksanakan</td>
                        <td className="border border-blue-500 px-6 py-4">Terjadi ketidaksesuaian terhadap prosedur/aturan dalam pendaftaran penerimaan peserta didik baru</td>
                        <td className="border border-blue-500 px-6 py-4 text-center">3</td>
                        <td className="border border-blue-500 px-6 py-4 text-center">3</td>
                        <td className="border border-blue-500 px-6 py-4 text-center">3</td>
                        <td className="border border-blue-500 px-6 py-4 text-center">Sedang</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table;