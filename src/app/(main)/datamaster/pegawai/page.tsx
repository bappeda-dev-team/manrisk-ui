'use client'

import { Table } from "./table";
import { TbUsers } from "react-icons/tb";
import { motion } from 'framer-motion';

const Pegawai = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2 uppercase font-bold text-2xl">
                    <TbUsers />
                    <h1>List Pegawai</h1>
                </div>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        // delay: 0, // Jeda sebelum animasi dimulai
                        duration: 0.2,
                        ease: "backOut" // Efek "rebound" kecil
                    }}
                    className='flex flex-col gap-3'
                >
                    <Table />
                </motion.div>
            </div>
        </div>
    )
}

export default Pegawai;