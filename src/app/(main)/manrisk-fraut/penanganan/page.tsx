import { HeaderFraut } from "@/components/page/HeaderFraut";
import Table from "./Table";
import { TbAlertTriangle } from "react-icons/tb";
import { TbPrinter } from "react-icons/tb";
import Link from "next/link";
import { ButtonSky } from "@/components/global/button";

const ManriskFrautPenanganan = () => {
    return (
        <div className="flex flex-col gap-3">
            <HeaderFraut />
            <div data-aos="fade-up" className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <div className="flex flex-wrap items-center gap-2 uppercase font-bold text-2xl">
                        <TbAlertTriangle />
                        <h1> manrisk fraud - Pengendalian </h1>
                    </div>
                    <Link href="/Cetak/kinerja/penanganan/1">
                        <ButtonSky className="flex items-center gap-1">
                            <TbPrinter />
                            Cetak
                        </ButtonSky>
                    </Link>
                </div>
                <Table />
            </div>
        </div>
    )
}

export default ManriskFrautPenanganan;