import { Table } from "./table";
import { TbArticle } from "react-icons/tb";

const JenisResiko = () => {
    return (
        <div className="flex flex-col gap-3">
            <div data-aos="fade-up" className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2 uppercase font-bold text-2xl">
                    <TbArticle />
                    <h1>Data Master Jenis Risiko</h1>
                </div>
                <Table />
            </div>
        </div>
    )
}

export default JenisResiko;