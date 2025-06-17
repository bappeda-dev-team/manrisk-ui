'use client'

import { Modal } from "@/components/global/Modal"
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form";
import { ButtonRed, ButtonSky } from "@/components/global/button";
import React, { useState, useEffect } from "react";
import { LoadingButtonClip } from "@/components/global/loadingButton";
import { FloatingLabelInput, FloatingLabelTextarea } from "@/components/global/input";
import useToast from "@/components/global/alert/toastAlert";

interface ModalAnalisa {
    isOpen: boolean;
    onClose: () => void;
    data: FormValue;
}

type FormValue = {
    nama_pemilik_resiko: string;
    tahap_proses_bisnis: string;
    nama_resiko_fraud: string;
    penyebab: string;
    akibat: string;
    dampak: number;
    kemungkinan: number;
}

export const ModalAnalisa: React.FC<ModalAnalisa> = ({ isOpen, onClose, data }) => {

    const { toastSuccess, toastError, toastInfo, toastWarning } = useToast()
    const { reset, control, handleSubmit, setValue } = useForm<FormValue>({
        defaultValues: {
            nama_pemilik_resiko: data.nama_pemilik_resiko,
            tahap_proses_bisnis: data.tahap_proses_bisnis,
            nama_resiko_fraud: data.nama_resiko_fraud,
            penyebab: data.penyebab,
            akibat: data.akibat,
            dampak: data.dampak,
            kemungkinan: data.kemungkinan,
        }
    });

    const [TingkatResiko, setTingkatResiko] = useState<number>(0);
    const [LevelResiko, setLevelResiko] = useState<string>("");
    const [Proses, setProses] = useState<boolean>(false);

    const handleClose = () => {
        onClose();
        reset();
    }

    const [dampak, kemungkinan] = useWatch({
        control,
        name: ['dampak', 'kemungkinan'], // Watch kedua field ini
    });


    useEffect(() => {
        // Pastikan nilai adalah angka sebelum melakukan perhitungan
        const d = Number(dampak);
        const k = Number(kemungkinan);

        if (!isNaN(d) && !isNaN(k)) {
            const hasil = d * k;
            setTingkatResiko(hasil);

            // Anda bisa menambahkan logika untuk menentukan LevelResiko di sini
            let level = '-';
            if (hasil <= 4) {
                level = 'Rendah';
            } else if (hasil <= 12) {
                level = 'Sedang';
            } else {
                level = 'Tinggi';
            }
            setLevelResiko(level);
        } else {
            setTingkatResiko(0); // Reset jika input tidak valid
            setLevelResiko('-');
        }
    }, [dampak, kemungkinan, setValue]);

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        const formData = {
            //key : value
            nama_resiko_fraud: data.nama_resiko_fraud || "-",
            penyebab: data.penyebab || "-",
            akibat: data.akibat || "-",
            dampak: Number(data.dampak) || 0,
            kemungkinan: Number(data.kemungkinan) || 0,
        };
        console.log(formData);
        toastSuccess("Berhasil Menyimpan Data");
        handleClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
        >
            <div className="w-max-[500px] py-2 border-b border-blue-500 text-center">
                <h1 className="text-xl uppercase">Form Analisa</h1>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col mx-5 py-5 gap-2"
            >
                <Controller
                    name="nama_pemilik_resiko"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="nama_pemilik_resiko"
                            label="Nama Pemilik Resiko"
                            type="text"
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
                            type="text"
                            disable={true}
                        />
                    )}
                />
                <Controller
                    name="nama_resiko_fraud"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="nama_resiko_fraud"
                            label="Nama Resiko Fraud"
                            type="text"
                        />
                    )}
                />
                <Controller
                    name="penyebab"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="penyebab"
                            label="Penyebab"
                        />
                    )}
                />
                <Controller
                    name="akibat"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="akibat"
                            label="Akibat"
                        />
                    )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 border border-gray-500 py-1 px-3 rounded-lg">
                    <Controller
                        name="dampak"
                        control={control}
                        render={({ field }) => (
                            <FloatingLabelInput
                                {...field}
                                id="dampak"
                                label="Dampak"
                                type="number"
                            />
                        )}
                    />
                    <Controller
                        name="kemungkinan"
                        control={control}
                        render={({ field }) => (
                            <FloatingLabelInput
                                {...field}
                                id="kemungkinan"
                                label="kemungkinan"
                                type="number"
                            />
                        )}
                    />
                    <div className="flex flex-col">
                        <p className="text-[9px] font-semibold">Tingkat Resiko :</p>
                        <div
                            className={`border border-gray-300 px-4 py-2 rounded-lg text-white
                                ${TingkatResiko <= 4 ? "bg-green-400" : TingkatResiko <= 12 ? "bg-yellow-400" : "bg-red-400"}    
                            `}
                        >
                            {TingkatResiko || "-"}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[9px] font-semibold">Level Resiko :</p>
                        <div
                            className={`border border-gray-300 px-4 py-2 rounded-lg text-white
                                ${TingkatResiko <= 4 ? "bg-green-400" : TingkatResiko <= 12 ? "bg-yellow-400" : "bg-red-400"}    
                            `}
                        >
                            {LevelResiko || "-"}
                        </div>
                    </div>
                </div>
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
                    <ButtonRed className="w-full" type="button" onClick={handleClose}>
                        Batal
                    </ButtonRed>
                </div>
            </form>
        </Modal>
    )
}