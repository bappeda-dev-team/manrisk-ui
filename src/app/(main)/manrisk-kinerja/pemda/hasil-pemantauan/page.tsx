import { HeaderKinerja } from "@/components/page/HeaderKinerja";
import { Table } from "./Table";
import Maintenance from "@/components/global/maintenance";
import { TbSettingsCog } from "react-icons/tb";

const ManriskKinerjaHasilPemantauan = () => {
    return (
        <div className="flex flex-col gap-3">
            <HeaderKinerja jenis="pemda" />
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 uppercase font-bold text-2xl">
                    <TbSettingsCog />
                    <h1> manrisk kinerja Pemda- Hasil Pemantauan </h1>
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