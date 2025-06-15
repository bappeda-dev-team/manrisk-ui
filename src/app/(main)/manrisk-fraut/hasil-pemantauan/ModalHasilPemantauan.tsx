'use client'

import { Modal } from "@/components/global/Modal"
import { ButtonRed, ButtonSky } from "@/components/global/button";
import { useState } from "react";
import { LoadingButtonClip } from "@/components/global/loadingButton";
import { FloatingLabelInput, FloatingLabelTextarea } from "@/components/global/input";
import { toast } from 'react-toastify';

interface ModalPemantauan {
    isOpen: boolean;
    onClose: () => void;
}

export const ModalHasilPemantauan: React.FC<ModalPemantauan> = ({ isOpen, onClose }) => {

    const [Proses, setProses] = useState<boolean>(false);

    const notifikasiBerhasil = () => {
        toast.success("Berhasil Menyimpan Data");
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="w-max-[500px] py-2 border-b text-center border-blue-500">
                <h1 className="text-xl uppercase">Form Hasil Pemantauan</h1>
            </div>
            <form
                // onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col mx-5 py-5 gap-2"
            >
                <FloatingLabelTextarea
                    id="resiko_kecuarangan_yang_dimitigasi"
                    label="Resiko Kecurangan Yang Dimitigasi"
                />
                <FloatingLabelTextarea
                    id="bentuk_kegiatan_pengendalian"
                    label="Bentuk Kegiatan Pengendalian"
                />
                <div className="grid border p-2 rounded-lg grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
                    <FloatingLabelInput
                        id="dampak"
                        label="Dampak"
                    />
                    <FloatingLabelInput
                        id="kemungkinan"
                        label="Kemungkinan"
                    />
                    <div className="flex items-center gap-1">
                        <div className="flex flex-col py-2 w-full">
                            <div className="border border-gray-300 px-4 py-2 rounded-lg bg-green-500 text-white">Tingkat Resiko</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="flex flex-col py-2 w-full">
                            <div className="border border-gray-300 px-4 py-2 rounded-lg bg-green-500 text-white">Level Resiko</div>
                        </div>
                    </div>
                </div>
                <FloatingLabelTextarea 
                    id="catatan"
                    label="Catatan"
                />
                <div className="flex flex-col gap-2 mt-3">
                    <ButtonSky 
                        className="w-full" 
                        type="button"
                        onClick={() => {
                            notifikasiBerhasil();
                            onClose();
                        }}
                    >
                        {Proses ?
                            <span className="flex">
                                <LoadingButtonClip />
                                Menyimpan...
                            </span>
                            :
                            "Simpan"
                        }
                    </ButtonSky>
                    <ButtonRed className="w-full" type="button" onClick={onClose}>
                        Batal
                    </ButtonRed>
                </div>
            </form>
        </Modal>
    )
}