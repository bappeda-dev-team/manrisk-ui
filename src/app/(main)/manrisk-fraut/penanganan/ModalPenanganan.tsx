'use client'

import { Modal } from "@/components/global/Modal"
import { ButtonRed, ButtonSky } from "@/components/global/button";
import { useState } from "react";
import { LoadingButtonClip } from "@/components/global/loadingButton";
import Select from 'react-select';
import { FloatingLabelTextarea, FloatingLabelInput } from "@/components/global/input";
import { toast } from "react-toastify";

interface ModalPenanganan {
    isOpen: boolean;
    onClose: () => void;
}

export const ModalPenanganan: React.FC<ModalPenanganan> = ({ isOpen, onClose }) => {

    const [Proses, setProses] = useState<boolean>(false);

    const notifikasiBerhasil = () => {
        toast.success("Berhasil Menyimpan Data");
    }

    const OptionJenisResiko = [
        { value: "Penyuapan", label: "Penyuapan" },
        { value: "Nepotisme", label: "Nepotisme" },
    ]

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="w-max-[500px] py-2 border-b text-center border-blue-500">
                <h1 className="text-xl uppercase">Form Penanganan</h1>
            </div>
            <form
                // onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col mx-5 py-5 gap-2"
            >
                <FloatingLabelTextarea 
                    id="existing_control"
                    label="Existing Control"
                />
                <FloatingLabelTextarea 
                    id="jenis_perlakuan"
                    label="Jenis Perlakuan"
                />
                <FloatingLabelTextarea 
                    id="rencana_perlakuan_resiko"
                    label="Rencana Perlakuan Resiko"
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
                <FloatingLabelInput 
                    id="target_waktu"
                    label="Target Waktu"
                />
                <FloatingLabelInput
                    id="penanggung_jawab"
                    label="Penanggung Jawab (PIC)"
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