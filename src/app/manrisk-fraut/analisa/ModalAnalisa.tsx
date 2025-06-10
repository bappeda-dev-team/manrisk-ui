'use client'

import { Modal } from "@/components/global/Modal"
import { ButtonRed, ButtonSky } from "@/components/global/button";
import { useState } from "react";
import { LoadingButtonClip } from "@/components/global/loadingButton";
import { FloatingLabelInput, FloatingLabelTextarea } from "@/components/global/input";
import { AlertNotification } from "@/components/global/alert/sweetAlert2";
import useToast from "@/components/global/alert/toastAlert";

interface ModalAnalisa {
    isOpen: boolean;
    onClose: () => void;
}

export const ModalAnalisa: React.FC<ModalAnalisa> = ({ isOpen, onClose }) => {

    const { toastSuccess, toastError, toastInfo, toastWarning } = useToast()
    const [Proses, setProses] = useState<boolean>(false);

    const cekNotif = () => {
        AlertNotification("Berhasil", "Data berhasil disimpan", "success", 2000, false);
    }
    const notifikasiBerhasil = () => {
        toastSuccess("Berhasil Menyimpan Data");
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="w-max-[500px] py-2 border-b border-blue-500 text-center">
                <h1 className="text-xl uppercase">Form Analisa</h1>
            </div>
            <form
                // onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col mx-5 py-5 gap-2"
            >
                <FloatingLabelInput
                    id="nama_resiko_fraud"
                    label="Nama Resiko Fraud"
                />
                <FloatingLabelTextarea
                    id="penyebab"
                    label="Penyebab"
                />
                <FloatingLabelTextarea
                    id="akibat"
                    label="Akibat"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 border border-gray-500 py-1 px-3 rounded-lg">
                    <FloatingLabelInput
                        id="dampak"
                        label="Dampak"
                    />
                    <FloatingLabelInput
                        id="kemungkinan"
                        label="Kemungkinan"
                    />
                    <div className="border border-gray-300 px-4 py-2 my-3 rounded-lg bg-green-500 text-white">Tingkat Resiko</div>
                    <div className="border border-gray-300 px-4 py-2 my-3 rounded-lg bg-green-500 text-white">Level Resiko</div>
                </div>
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