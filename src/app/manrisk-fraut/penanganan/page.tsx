import { HeaderFraut } from "@/components/page/HeaderFraut";
import Table from "./Table";

const ManriskFrautPenanganan = () => {
    return (
        <div className="flex flex-col gap-3">
            <HeaderFraut />
            <div className="flex flex-col gap-2">
                <h1 className="uppercase font-bold text-2xl">manrisk fraud - Penanganan</h1>
                <Table />
            </div>
        </div>
    )
}

export default ManriskFrautPenanganan;