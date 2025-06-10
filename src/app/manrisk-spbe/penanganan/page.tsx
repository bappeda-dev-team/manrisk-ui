import { HeaderSpbe } from "@/components/page/HeaderSpbe";
import { TbSettingsCog } from "react-icons/tb";
import Maintenance from "@/components/global/maintenance";

const ManriskSpbePenanganan = () => {
    return (
        <div className="flex flex-col gap-3">
            <HeaderSpbe />
            <div data-aos="fade-up" className="flex flex-col gap-2">
                {/* <div className="flex items-center gap-2 uppercase font-bold text-2xl">
                    <TbSettingsCog />
                    <h1> Manrisk SPBE - Penanganan </h1>
                </div>
                <Table /> */}
                <Maintenance />
            </div>
        </div>
    )
}

export default ManriskSpbePenanganan;