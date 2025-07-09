'use client'

import { motion } from 'framer-motion';
import { TbArticle, TbBuilding, TbUsers, TbAlertTriangle, TbDeviceAnalytics, TbUser, TbBuildingCommunity } from 'react-icons/tb';
import { BoxMenu } from '@/components/page/BoxMenu';


const Laporan = () => {
  return (
    <>
      <div className="flex flex-col gap-3 mt-3">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            // delay: 0, // Jeda sebelum animasi dimulai
            duration: 0.8,
            ease: "backOut" // Efek "rebound" kecil
          }}
          className='flex flex-col gap-3'
        >
          <h1 className='ml-3 font-bold text-xl text-gray-700'>Rekap Data Manrisk</h1>
          <div
            className="grid lg:grid-cols-3 grid-cols-1 gap-3 justify-center items-center"
          >
            <BoxMenu
              title="Kinerja Pemda"
              detail='Rekap data manrisk kinerja PEMDA'
              url="/laporan"
            >
              <TbBuildingCommunity size={50} />
            </BoxMenu>
            <BoxMenu
              title="Kinerja OPD"
              detail='Rekap data manrisk kinerja OPD'
              url="/laporan"
            >
              <TbBuilding size={50} />
            </BoxMenu>
            <BoxMenu
              title="Kinerja Individu"
              detail='Rekap data manrisk kinerja Individu'
              url="/laporan"
            >
              <TbUser size={50} />
            </BoxMenu>
            <BoxMenu
              title="Fraud"
              detail='Rekap data manrisk Fraud'
              url="/laporan"
            >
              <TbAlertTriangle size={50} />
            </BoxMenu>
            <BoxMenu
              title="Kinerja SPBE"
              detail='Rekap data manrisk SPBE'
              url="/laporan"
            >
              <TbDeviceAnalytics size={50} />
            </BoxMenu>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Laporan;