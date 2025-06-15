'use client'

import { Modal } from "@/components/global/Modal"
import { ButtonRed, ButtonSky } from "@/components/global/button";
import { useState } from "react";
import { LoadingButtonClip } from "@/components/global/loadingButton";
import Select from 'react-select';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FloatingLabelTextarea, FloatingLabelInput } from "@/components/global/input";
import { toast } from "react-toastify";

interface ModalPenanganan {
    isOpen: boolean;
    onClose: () => void;
}
interface OptionTypeString {
    value: string;
    label: string;
}
interface FormValue {
    existing_control: string;
    jenis_perlakuan: string;
    rencana_perlakuan_resiko: string;
    jenis_resiko: OptionTypeString;
    target_waktu: string;
    penanggung_jawab: string;
}

export const ModalPenanganan: React.FC<ModalPenanganan> = ({ isOpen, onClose }) => {

    const { control, handleSubmit, reset } = useForm<FormValue>({
        defaultValues: {
            existing_control: '',
            jenis_perlakuan: '',
            rencana_perlakuan_resiko: '',
            jenis_resiko: {
                value: '',
                label: 'Pilih Jenis Resiko'
            },
            target_waktu: '',
            penanggung_jawab: 'otomatis ambil dari table sebelumnya',
        }
    });
    
    const [Proses, setProses] = useState<boolean>(false);

    const OptionJenisResiko = [
        { value: "Penyuapan", label: "Penyuapan" },
        { value: "Nepotisme", label: "Nepotisme" },
    ];

    const onSubmit: SubmitHandler<FormValue> = async(data: FormValue) => {
        const formData = {
            existing_control: data.existing_control,
            jenis_perlakuan: data.jenis_perlakuan,
            rencana_perlakuan_resiko: data.rencana_perlakuan_resiko,
            jenis_resiko: data.jenis_resiko?.value,
            target_waktu: data.target_waktu,
            penanggung_jawab: data.penanggung_jawab 
        }
        console.log(formData);
        onClose();
        reset();
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="w-max-[500px] py-2 border-b text-center border-blue-500">
                <h1 className="text-xl uppercase">Form Penanganan</h1>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col mx-5 py-5 gap-2"
            >
                <Controller 
                    name="existing_control"
                    control={control}
                    render={({field}) => (
                        <FloatingLabelTextarea
                            {...field} 
                            id="existing_control"
                            label="Existing Control"
                        />
                    )}
                />
                <Controller 
                    name="jenis_perlakuan"
                    control={control}
                    render={({field}) => (
                        <FloatingLabelTextarea 
                            {...field}
                            id="jenis_perlakuan"
                            label="Jenis Perlakuan"
                        />
                    )}
                />
                <Controller 
                    name="rencana_perlakuan_resiko"
                    control={control}
                    render={({field}) => (
                        <FloatingLabelTextarea
                            {...field} 
                            id="rencana_perlakuan_resiko"
                            label="Rencana Perlakuan Resiko"
                        />
                    )}
                />
                <Controller 
                    name="jenis_resiko"
                    control={control}
                    render={({field}) => (
                        <div className="flex items-center gap-1">
                            <div className="flex flex-col py-2 w-full">
                                <Select
                                    {...field}
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
                    )}
                />
                <Controller 
                    name="target_waktu"
                    control={control}
                    render={({field}) => (
                        <FloatingLabelInput 
                            {...field}
                            id="target_waktu"
                            label="Target Waktu"
                        />
                    )}
                />
                <Controller 
                    name="penanggung_jawab"
                    control={control}
                    render={({field}) => (
                        <FloatingLabelInput
                            {...field}
                            id="penanggung_jawab"
                            label="Penanggung Jawab (PIC)"
                            disable={true}
                        />
                    )}
                />
                <div className="flex flex-col gap-2 mt-3">
                    <ButtonSky 
                        className="w-full" 
                        type="submit"
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