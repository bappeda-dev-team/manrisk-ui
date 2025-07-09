'use client'

import { motion } from 'framer-motion';
import { TbArticle, TbBuilding, TbUsers, TbAlertTriangle, TbDeviceAnalytics, TbUser, TbBuildingCommunity } from 'react-icons/tb';
import { BoxMenu } from '@/components/page/BoxMenu';


const DataMaster = () => {
  return (
    <>
      <div className="flex flex-col gap-3">
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
          <h1 className='ml-3 font-bold text-xl text-gray-700'>Data Master</h1>
          <div
            className="grid lg:grid-cols-2 grid-cols-1 gap-3 justify-center"
          >
            <BoxMenu
              title="Jenis Risiko"
              detail='Data Master untuk mengatur data jenis risiko yang digunakan di pilihan saat mengisi identifikasi manrisk fraud'
              url="/datamaster/jenisresiko"
            >
              <TbArticle size={50} />
            </BoxMenu>
            <BoxMenu
              title="Daftar OPD"
              detail=' Menampilkan daftar Organisasi Perangkat Daerah apa saja yang terdaftar didalam website, control data tersedia di data master menu perencanaan'
              url="/datamaster/opd"
            >
              <TbBuilding size={50} />
            </BoxMenu>
            <BoxMenu
              title="Daftar Pegawai"
              detail=' Menampilkan daftar Pegawai siapa saja yang terdaftar didalam website, control data tersedia di data master menu perencanaan'
              url="/datamaster/pegawai"
            >
              <TbUsers size={50} />
            </BoxMenu>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default DataMaster;