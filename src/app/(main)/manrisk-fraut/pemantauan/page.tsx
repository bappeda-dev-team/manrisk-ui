import { HeaderFraut } from "@/components/page/HeaderFraut";
import Table from "./Table";
import { TbAlertTriangle, TbPrinter } from "react-icons/tb";
import { ButtonSky } from "@/components/global/button";
import Link from "next/link";

const ManriskFrautPemantauan = () => {
    return (
        <div className="flex flex-col gap-3">
            <HeaderFraut />
            <div data-aos="fade-up" className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <div className="flex flex-wrap items-center gap-2 uppercase font-bold text-2xl">
                        <TbAlertTriangle />
                        <h1> manrisk fraud - Pemantauan RTP </h1>
                    </div>
                    <Link href="/Cetak/kinerja/pemantauan/1">
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

export default ManriskFrautPemantauan;