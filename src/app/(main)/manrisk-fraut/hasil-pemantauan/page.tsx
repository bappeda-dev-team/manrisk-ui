import { HeaderFraut } from "@/components/page/HeaderFraut";
import Table from "./Table";
import Maintenance from "@/components/global/maintenance";
import { TbAlertTriangle, TbPrinter } from "react-icons/tb";
import Link from "next/link";
import { ButtonSky } from "@/components/global/button";

const ManriskFrautAnalisa = () => {
    return (
        <div className="flex flex-col gap-3">
            <HeaderFraut />
            <div data-aos="fade-up" className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <div className="flex flex-wrap items-center gap-2 uppercase font-bold text-2xl">
                        <TbAlertTriangle />
                        <h1> manrisk fraud - Hasil - Pemantauan </h1>
                    </div>
                    <Link href="/Cetak/kinerja/hasil-pemantauan/1">
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

export default ManriskFrautAnalisa;