import { HeaderFraut } from "@/components/page/HeaderFraut";
import Table from "./Table";
import Link from "next/link";
import { TbAlertTriangle, TbPrinter } from "react-icons/tb";
import { ButtonSky } from "@/components/global/button";

const ManriskFrautIdentifikasi = () => {
    return (
        <div className="flex flex-col gap-3">
            <HeaderFraut />
            <div data-aos="fade-up" className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <div className="flex flex-wrap items-center gap-2 uppercase font-bold text-2xl">
                        <TbAlertTriangle />
                        <h1> manrisk fraud - identifikasi </h1>
                    </div>
                    <Link href="/Cetak/kinerja/identifikasi/1" target="_blank" rel="noopener noreferrer">
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

export default ManriskFrautIdentifikasi;