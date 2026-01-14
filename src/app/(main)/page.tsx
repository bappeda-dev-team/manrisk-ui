'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useBrandingContext } from '@/components/context/BrandingContext';
import { User } from '../types';
import { authenticate } from '@/lib/auth';
import Logout from '@/components/Logout';
import Login from '@/components/Login';

export default function Home() {

  const { branding } = useBrandingContext();
  const [User, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authenticate();
        setUser(res);
      } catch (err) {
        console.error('Autentikasi gagal', err);
      }
    };
    fetchUser();
  }, []);

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
            src={branding.logo}
            alt="logo"
            width={100}
            height={100}
          />
          <h1 className="text-4xl uppercase font-extrabold">Manrisk</h1>
          <h3 className="text-base font-light">Manajemen Risiko</h3>
          {User ?
            <Logout />
            :
            <Login />
          }
        </div>
      </motion.div>
    </>
  );
}
