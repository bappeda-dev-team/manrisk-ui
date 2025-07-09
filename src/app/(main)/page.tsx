'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useBrandingContext } from '@/components/context/BrandingContext';

export default function Home() {

  const { branding } = useBrandingContext();

  return (
    <>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          // delay: 0, // Jeda sebelum animasi dimulai
          duration: 0.2,
          ease: "backOut" // Efek "rebound" kecil
        }}
        className="h-screen flex items-center justify-center"
      >
        <div className="flex flex-col items-center gap-2 rounded-xl py-10 px-30 shadow-2xl shadow-gray-400">
          <Image
            className='mb-3'
            src={branding.logo || "https://cdnkk.zeabur.app/api/cdn/download/images/universal.png"}
            alt="logo"
            width={100}
            height={100}
          />
          <h1 className="text-4xl uppercase font-extrabold">Manrisk</h1>
          <h3 className="text-base font-light">Manajemen Risiko</h3>
        </div>
      </motion.div>
    </>
  );
}
