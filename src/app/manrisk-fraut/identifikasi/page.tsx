import { HeaderFraut } from "@/components/page/HeaderFraut";
import Table from "./Table";
import { TbAlertTriangle } from "react-icons/tb";

const ManriskFrautIdentifikasi = () => {
    return (
        <div className="flex flex-col gap-3">
            <HeaderFraut />
            <div data-aos="fade-up" className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2 uppercase font-bold text-2xl">
                    <TbAlertTriangle />
                    <h1> manrisk fraud - identifikasi </h1>
                </div>
                <Table />
            </div>
        </div>
    )
}

export default ManriskFrautIdentifikasi;