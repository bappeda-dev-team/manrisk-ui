'use client'

import { Modal } from "@/components/global/Modal"

interface ModalIdentifikasi {
    isOpen: boolean;
    onClose: () => void;
}

export const ModalIdentifikasi:React.FC<ModalIdentifikasi> = ({ isOpen, onClose }) => {

    return(
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            cek 
        </Modal>
    )
}