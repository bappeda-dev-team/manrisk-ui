import { HeaderKinerja } from "@/components/page/HeaderKinerja";
import { Table } from "./Table";
import Maintenance from "@/components/global/maintenance";
import { TbAlertTriangle } from "react-icons/tb";

const ManriskKinerjaHasilPemantauan = () => {
    return (
        <div className="flex flex-col gap-3">
            <HeaderKinerja jenis="opd" />
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 uppercase font-bold text-2xl">
                    <TbAlertTriangle />
                    <h1> manrisk kinerja - Hasil Pemantauan </h1>
                </div>
                <div>
                    <Table />
                </div>
                {/* <Maintenance /> */}
            </div>
        </div>
    )
}

export default ManriskKinerjaHasilPemantauan;