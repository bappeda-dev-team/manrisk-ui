import { HeaderFraut } from "@/components/page/HeaderFraut";
import { TbAlertTriangle } from "react-icons/tb";
import Maintenance from "@/components/global/maintenance";
import { Table } from "./Table";

const ManriskFrautRekin = () => {
    return (
        <div className="flex flex-col gap-3">
            <HeaderFraut />
            <div data-aos="fade-up" className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2 uppercase font-bold text-2xl">
                    <TbAlertTriangle />
                    <h1> manrisk fraud - list rencana kinerja</h1>
                </div>
                <Table />
            </div>
        </div>
    )
}

export default ManriskFrautRekin;