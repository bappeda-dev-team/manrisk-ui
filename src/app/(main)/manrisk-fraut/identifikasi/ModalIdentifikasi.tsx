'use client'

import { Modal } from "@/components/global/Modal"
import { ButtonRed, ButtonSky } from "@/components/global/button";
import { useEffect, useState } from "react";
import { LoadingButtonClip } from "@/components/global/loadingButton";
import { FloatingLabelInput, FloatingLabelTextarea, FloatingLabelSelect } from "@/components/global/input";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import useToast from "@/components/global/alert/toastAlert";
import Select from "react-select";

interface ModalIdentifikasiProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    data: FormValue;
    jenis: "baru" | "edit" | "";
}
interface OptionTypeString {
    value: string;
    label: string;
}
interface FormValue {
    nama_pegawai?: string;
    nama_rencana_kinerja?: string;
    pegawai_id?: string;
    
    id_rencana_kinerja: string;
    nama_risiko: string;
    jenis_risiko?: OptionTypeString | null | undefined;
    kemungkinan_kecurangan: string;
    strategi: string;
    indikasi: string;
    kemungkinan_pihak_terkait: string;
    pembuat: {
        nama: string;
        nip: string;
        golongan: string;
    }
}
interface PostIdentifikasiResponse {
    message: string;
}

export const ModalIdentifikasi: React.FC<ModalIdentifikasiProps> = ({ isOpen, onClose, data, jenis, onSuccess }) => {
    
    const DefaultValue = {
        pemilik_resiko: '-',
        nama_rencana_kinerja: '-',
        strategi: "",
        nama_resiko_fraud: "",
        jenis_resiko: null,
        kemungkinan_kecurangan: '',
        indikasi: '',
        kemungkinan_pihak_terkait: '',
    }
    const { control, reset, handleSubmit } = useForm<FormValue>({
        defaultValues: DefaultValue
    });

    useEffect(() => {
        if (isOpen) {
            reset({
                id_rencana_kinerja: data.id_rencana_kinerja || '',
                nama_pegawai: data.nama_pegawai || '',
                nama_rencana_kinerja: data.nama_rencana_kinerja || '',
                strategi: data.strategi || '',
                nama_risiko: data.nama_risiko || '',
                // Perbaiki logika jenis_risiko: pastikan menghasilkan { value: string, label: string }
                jenis_risiko: (data.jenis_risiko && typeof data.jenis_risiko === 'string')
                    ? { value: data.jenis_risiko, label: data.jenis_risiko }
                    : null,
                kemungkinan_kecurangan: data.kemungkinan_kecurangan || '',
                indikasi: data.indikasi || '',
                kemungkinan_pihak_terkait: data.kemungkinan_pihak_terkait || '',
                pembuat: data.pembuat || { nama: '', nip: '', golongan: '' } // Pastikan pembuat juga diisi
            });
        } else {
            reset(DefaultValue);
        }
    }, [isOpen, reset, data]);

    const { toastSuccess, toastError, toastInfo, toastWarning } = useToast();

    const handleClose = () => {
        onClose();
        reset();
    }

    const onSubmit: SubmitHandler<FormValue> = async (dataValue: FormValue) => {
        const formData = {
            id_rencana_kinerja: dataValue.id_rencana_kinerja,
            nama_risiko: dataValue.nama_risiko,
            // jenis_risiko: dataValue.jenis_risiko?.value,
            kemungkinan_kecurangan: dataValue.kemungkinan_kecurangan,
            strategi: "-",
            indikasi: dataValue.indikasi,
            kemungkinan_pihak_terkait: dataValue.kemungkinan_pihak_terkait,
            pembuat: {
                nama: dataValue.nama_pegawai || "-",
                nip: dataValue.pegawai_id || "-",
                golongan: "-",
            }
        }
        
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
            <div className="w-max-[500px] pb-2 border-b border-blue-500 text-center">
                <h1 className="text-xl uppercase font-semibold">Form Identifikasi {jenis}</h1>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col mx-5 py-5 gap-2"
            >
                <Controller
                    name="nama_pegawai"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="nama_pegawai"
                            label="Pemilik Resiko"
                            disable={true}
                        />
                    )}
                />
                <Controller
                    name="nama_rencana_kinerja"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="nama_recana_kinerja"
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
                            disable={true}
                        />
                    )}
                />
                <Controller
                    name="nama_risiko"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="nama_risiko"
                            label="Nama Risiko Fraud"
                        />
                    )}
                />
                <Controller
                    name="jenis_risiko"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelSelect
                            {...field}
                            id="jenis_risiko"
                            label="Jenis Resiko"
                            options={OptionJenisResiko}
                            isClearable
                        />
                    )}
                />
                <Controller
                    name="kemungkinan_kecurangan"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="kemungkinan_kecurangan"
                            label="Kemungkinan Skenario Kecurangan"
                        />
                    )}
                />
                <Controller
                    name="indikasi"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="indikasi"
                            label="Gejala Indikasi"
                        />
                    )}
                />
                <Controller
                    name="kemungkinan_pihak_terkait"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
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
                        Simpan
                    </ButtonSky>
                    <ButtonRed className="w-full" type="button" onClick={onClose}>
                        Batal
                    </ButtonRed>
                </div>
            </form>
        </Modal>
    )
}