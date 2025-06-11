'use client'

import { Modal } from "@/components/global/Modal"
import { ButtonRed, ButtonSky } from "@/components/global/button";
import { useState } from "react";
import { LoadingButtonClip } from "@/components/global/loadingButton";
import { FloatingLabelInput, FloatingLabelTextarea } from "@/components/global/input";
import { toast } from 'react-toastify';
import Select from "react-select";

interface ModalIdentifikasi {
    isOpen: boolean;
    onClose: () => void;
}

export const ModalIdentifikasi: React.FC<ModalIdentifikasi> = ({ isOpen, onClose }) => {

    const [Proses, setProses] = useState<boolean>(false);

    const notifikasiBerhasil = () => {
        toast.success("Berhasil Menyimpan Data");
    }

    const OptionJenisResiko = [
        { value: "penyuapan", label: "Penyuapan" },
        { value: "nepotisme", label: "Nepotisme" }
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="w-max-[500px] py-2 border-b border-blue-500 text-center">
                <h1 className="text-xl uppercase">Form Identifikasi</h1>
            </div>
            <form
                // onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col mx-5 py-5 gap-2"
            >
                <FloatingLabelInput
                    id="strategi"
                    label="Strategi / Program Unit Kerja"
                />
                <FloatingLabelTextarea
                    id="nama_resiko_fraud"
                    label="Nama Resikok Fraud"
                />
                <div className="flex items-center gap-1">
                    <div className="flex flex-col py-2 w-full">
                        <Select
                            id="biaya_perlakuan_resiko"
                            options={OptionJenisResiko}
                            placeholder="Pilih Jenis Resiko"
                            styles={{
                                control: (baseStyles) => ({
                                    ...baseStyles,
                                    borderRadius: '8px',
                                    borderColor: 'gray',
                                    textAlign: 'start',
                                })
                            }}
                        />
                    </div>
                </div>
                <FloatingLabelTextarea
                    id="kemungkinan_skenario_kecurangan"
                    label="Kemungkinan Skenario Kecurangan"
                />
                <FloatingLabelTextarea
                    id="gejala_indikasi"
                    label="Gejala Indikasi"
                />
                <FloatingLabelTextarea
                    id="kemungkinan_pihak_terkait"
                    label="Kemungkinan Pihak Terkait"
                />
                <div className="flex flex-col gap-2 mt-3">
                    <ButtonSky
                        className="w-full"
                        type="submit"
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