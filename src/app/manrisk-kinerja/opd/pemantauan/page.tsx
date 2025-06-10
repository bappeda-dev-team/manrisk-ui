import { HeaderKinerja } from "@/components/page/HeaderKinerja";
import { TbSettingsCog } from "react-icons/tb";
import Maintenance from "@/components/global/maintenance";

const ManriskKinerjaOpdPemantauan = () => {
    return (
        <div className="flex flex-col gap-3">
            <HeaderKinerja jenis="opd" />
            <div data-aos="fade-up" className="flex flex-col gap-2">
                {/* <div className="flex items-center gap-2 uppercase font-bold text-2xl">
                    <TbSettingsCog />
                    <h1> Manrisk Kinerja Opd- Pemantauan </h1>
                </div>
                <Table /> */}
                <Maintenance />
            </div>
        </div>
    )
}

export default ManriskKinerjaOpdPemantauan;