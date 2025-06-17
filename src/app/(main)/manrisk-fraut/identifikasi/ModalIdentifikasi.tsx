'use client'

import { Modal } from "@/components/global/Modal"
import { ButtonRed, ButtonSky } from "@/components/global/button";
import { useEffect, useState } from "react";
import { LoadingButtonClip } from "@/components/global/loadingButton";
import { FloatingLabelInput, FloatingLabelTextarea, FloatingLabelSelect } from "@/components/global/input";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from 'react-toastify';
import Select from "react-select";

interface ModalIdentifikasi {
    isOpen: boolean;
    onClose: () => void;
    data: FormValue;
}
interface OptionTypeString {
    value: string;
    label: string;
}
interface FormValue {
    pemilik_resiko: string;
    tahap_proses_bisnis: string;
    strategi: string;
    nama_resiko_fraud: string;
    jenis_resiko: OptionTypeString | null;
    kemungkinan_skenario_kecurangan: string;
    gejala_indikasi: string;
    kemungkinan_pihak_terkait: string;
}

export const ModalIdentifikasi: React.FC<ModalIdentifikasi> = ({ isOpen, onClose, data }) => {
    const DefaultValue = {
        pemilik_resiko: '-',
        tahap_proses_bisnis: '-',
        strategi: "",
        nama_resiko_fraud: "",
        jenis_resiko: null,
        kemungkinan_skenario_kecurangan: '',
        gejala_indikasi: '',
        kemungkinan_pihak_terkait: '',
    }
    const { control, reset, handleSubmit } = useForm<FormValue>({
        defaultValues: DefaultValue
    });

    useEffect(() => {
        if (isOpen) {
            reset({
                pemilik_resiko: data.pemilik_resiko,
                tahap_proses_bisnis: data.tahap_proses_bisnis,
                strategi: data.strategi,
                nama_resiko_fraud: data.nama_resiko_fraud,
                jenis_resiko: {
                    value: data.jenis_resiko?.value,
                    label: data.jenis_resiko?.label
                },
                kemungkinan_skenario_kecurangan: data.kemungkinan_skenario_kecurangan,
                gejala_indikasi: data.gejala_indikasi,
                kemungkinan_pihak_terkait: data.kemungkinan_pihak_terkait,
            });
        } else {
            reset(DefaultValue);
        }
    }, [isOpen, reset, data]);

    const [Proses, setProses] = useState<boolean>(false);

    const onSubmit: SubmitHandler<FormValue> = async (data: FormValue) => {
        const formData = {
            strategi: data.strategi,
            nama_resiko_fraud: data.nama_resiko_fraud,
            jenis_resiko: data.jenis_resiko?.value,
            kemungkinan_skenario_kecurangan: data.kemungkinan_skenario_kecurangan,
            gejala_indikasi: data.gejala_indikasi,
            kemungkinan_pihak_terkait: data.kemungkinan_pihak_terkait
        }
        console.log(formData);
        toast.success("Berhasil Menyimpan Data");
        onClose();
        reset();
    }

    const OptionJenisResiko = [
        { value: "Penyuapan", label: "Penyuapan" },
        { value: "Nepotisme", label: "Nepotisme" }
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="w-max-[500px] pb-2 border-b border-blue-500 text-center font-semibold">
                <h1 className="text-xl uppercase">Form Identifikasi</h1>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col mx-5 py-5 gap-2"
            >
                <Controller
                    name="pemilik_resiko"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="pemiliki_resiko"
                            label="Pemilik Resiko"
                            disable={true}
                        />
                    )}
                />
                <Controller
                    name="tahap_proses_bisnis"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="tahap_proses_bisnis"
                            label="Tahap Proses Bisnis"
                            disable={true}
                        />
                    )}
                />
                <Controller
                    name="strategi"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="strategi"
                            label="Strategi / Program Unit Kerja"
                        />
                    )}
                />
                <Controller
                    name="nama_resiko_fraud"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="nama_resiko_fraud"
                            label="Nama Resiko Fraud"
                        />
                    )}
                />
                <Controller
                    name="jenis_resiko"
                    control={control}
                    render={({ field }) => (
                        // <div className="flex items-center gap-1">
                        //     <div className="flex flex-col py-2 w-full">
                        //         <Select
                        //             {...field}
                        //             id="jenis_resiko"
                        //             options={OptionJenisResiko}
                        //             placeholder="Pilih Jenis Resiko"
                        //             isClearable
                        //             styles={{
                        //                 control: (baseStyles) => ({
                        //                     ...baseStyles,
                        //                     borderRadius: '8px',
                        //                     borderColor: 'gray',
                        //                     textAlign: 'start',
                        //                 })
                        //             }}
                        //         />
                        //     </div>
                        // </div>
                            <FloatingLabelSelect
                                {...field}
                                id="jenis_resiko"
                                label="Jenis Resiko"
                                options={OptionJenisResiko}
                                isClearable
                            // isClearable
                            // isSearchable
                            // disable={true} // Contoh penggunaan disable
                            />
                    )}
                />
                <Controller
                    name="kemungkinan_skenario_kecurangan"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="kemungkinan_skenario_kecurangan"
                            label="Kemungkinan Skenario Kecurangan"
                        />
                    )}
                />
                <Controller
                    name="gejala_indikasi"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="gejala_indikasi"
                            label="Gejala Indikasi"
                        />
                    )}
                />
                <Controller
                    name="kemungkinan_pihak_terkait"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="kemungkinan_pihak_terkait"
                            label="Kemungkinan Pihak Terkait"
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