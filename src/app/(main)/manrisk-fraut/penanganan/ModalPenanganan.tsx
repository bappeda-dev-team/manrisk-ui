'use client'

import { Modal } from "@/components/global/Modal"
import { ButtonRed, ButtonSky } from "@/components/global/button";
import { useState, useEffect } from "react";
import { LoadingButtonClip } from "@/components/global/loadingButton";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FloatingLabelTextarea, FloatingLabelInput } from "@/components/global/input";
import { toast } from "react-toastify";

interface ModalPenanganan {
    isOpen: boolean;
    onClose: () => void;
    data: FormValue;
}
interface FormValue {
    id_resiko: number,
    nama_pemilik_resiko: string,
    tahap_proses_bisnis: string,
    existing_control: string;
    jenis_perlakuan_resiko: string;
    rencana_perlakuan_resiko: string;
    biaya_perlakuan_resiko: number;
    target_waktu: string;
    penanggung_jawab: string;
}

export const ModalPenanganan: React.FC<ModalPenanganan> = ({ isOpen, onClose, data }) => {
    const DefaultValue = {
        nama_pemilik_resiko: '',
        tahap_proses_bisnis: '',
        existing_control: '',
        jenis_perlakuan_resiko: '',
        rencana_perlakuan_resiko: '',
        biaya_perlakuan_resiko: 0,
        target_waktu: '',
        penanggung_jawab: '',
    }
    const { control, handleSubmit, reset } = useForm<FormValue>({
        defaultValues: DefaultValue
    });

    useEffect(() => {
        if(isOpen){
            reset({
                nama_pemilik_resiko: data.nama_pemilik_resiko,
                tahap_proses_bisnis: data.tahap_proses_bisnis,
                existing_control: data.existing_control,
                jenis_perlakuan_resiko: data.jenis_perlakuan_resiko,
                rencana_perlakuan_resiko: data.rencana_perlakuan_resiko,
                biaya_perlakuan_resiko: data.biaya_perlakuan_resiko,
                target_waktu: data.target_waktu,
                penanggung_jawab: data.penanggung_jawab
            });
        } else {
            reset(DefaultValue)
        }
    },[isOpen]);

    const [Proses, setProses] = useState<boolean>(false);

    const onSubmit: SubmitHandler<FormValue> = async (data: FormValue) => {
        const formData = {
            existing_control: data.existing_control,
            rencana_perlakuan_resiko: data.rencana_perlakuan_resiko,
            jenis_perlakuan_resiko: data.jenis_perlakuan_resiko,
            biaya_perlakuan_resiko: data.biaya_perlakuan_resiko,
            target_waktu: data.target_waktu,
            penanggung_jawab: data.penanggung_jawab
        }
        console.log(formData);
        toast.success("Berhasil Edit Data");
        onClose();
        reset();
    }
    function formatRupiah(angka: number) {
        if (typeof angka !== 'number') {
            return String(angka); // Jika bukan angka, kembalikan sebagai string
        }
        return angka.toLocaleString('id-ID'); // 'id-ID' untuk format Indonesia
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="w-max-[500px] py-2 border-b text-center border-blue-500">
                <h1 className="text-xl uppercase font-semibold">Form Penanganan</h1>
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
                            disable={true}
                        />
                    )}
                />
                <Controller
                    name="tahap_proses_bisnis"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="tahap_proses_bisnis"
                            label="Tahap Proses Bisnis"
                        />
                    )}
                />
                <Controller
                    name="existing_control"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="existing_control"
                            label="Existing Control"
                        />
                    )}
                />
                <Controller
                    name="rencana_perlakuan_resiko"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="rencana_perlakuan_resiko"
                            label="Rencana Perlakuan Resiko"
                        />
                    )}
                />
                <Controller
                    name="jenis_perlakuan_resiko"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="jenis_perlakuan_resiko"
                            label="Jenis Perlakuan resiko"
                        />
                    )}
                />
                <Controller
                    name="target_waktu"
                    control={control}
                    render={({ field }) => (
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
                    render={({ field }) => (
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