'use client'

import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface modal {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    children: React.ReactNode;
}

export const Modal: React.FC<modal> = ({ isOpen, onClose, children }) => {

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
                console.log("esc di klik");
            }
        };

        // Tambahkan event listener saat komponen di-mount
        document.addEventListener('keydown', handleEscapeKey);

        // Hapus event listener saat komponen di-unmount (cleanup)
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    if (!isOpen) {
        return null;
    } else {

        return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black opacity-30" onClick={onClose}></div>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        // delay: 0, // Jeda sebelum animasi dimulai
                        duration: 0.2,
                        ease: "backOut" // Efek "rebound" kecil
                    }}
                    className="bg-white rounded-lg px-8 py-5 z-10 w-4/5 max-h-[80%] overflow-y-auto"
                >
                    {children}
                    {/*  */}
                </motion.div>
            </div>
        )
    }
}