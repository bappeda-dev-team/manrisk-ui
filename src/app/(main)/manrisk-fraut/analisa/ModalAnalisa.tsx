'use client'

import { Modal } from "@/components/global/Modal"
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form";
import { ButtonRed, ButtonSky } from "@/components/global/button";
import React, { useState, useEffect } from "react";
import { LoadingButtonClip } from "@/components/global/loadingButton";
import { FloatingLabelInput, FloatingLabelTextarea } from "@/components/global/input";
import useToast from "@/components/global/alert/toastAlert";
import { postAnalisa } from "./hook/hookAnalisa";

interface ModalAnalisa {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    data: FormValue;
    jenis: "baru" | "edit" | "";
}

type FormValue = {
    nama_pegawai?: string;
    nama_rencana_kinerja?: string;
    pegawai_id?: string;

    id_rencana_kinerja: string,
    nama_risiko: string,
    penyebab: string,
    akibat: string,
    skala_dampak: number,
    skala_kemungkinan: number,
    pembuat: {
        nama: string,
        nip: string,
        golongan: string
    }
}

interface PostAnalisaResponse {
    message: string;
}

export const ModalAnalisa: React.FC<ModalAnalisa> = ({ isOpen, onClose, onSuccess, data, jenis }) => {

    const { toastSuccess, toastError, toastInfo, toastWarning } = useToast();
    const [
        triggerPostAnalisa, // Ini adalah fungsi yang akan Anda panggil untuk memicu POST
        { data: postResponseData, proses: postProses, error: postError, message: postMessage }
    ] = postAnalisa<FormValue, PostAnalisaResponse>(jenis === 'baru' ? '/analisa' : `/analisa/${data.id_rencana_kinerja}`, jenis);

    const { reset, control, handleSubmit, setValue } = useForm<FormValue>({
        defaultValues: {
            nama_pegawai: data.nama_pegawai,
            nama_rencana_kinerja: data.nama_rencana_kinerja,
            pegawai_id: data.pegawai_id,
            id_rencana_kinerja: data.id_rencana_kinerja,
            nama_risiko: data.nama_risiko,
            penyebab: data.penyebab,
            akibat: data.akibat,
            skala_dampak: data.skala_dampak,
            skala_kemungkinan: data.skala_kemungkinan,
        }
    });

    const [TingkatResiko, setTingkatResiko] = useState<number>(0);
    const [LevelResiko, setLevelResiko] = useState<string>("");

    const handleClose = () => {
        onClose();
        reset();
    }

    const [skala_dampak, skala_kemungkinan] = useWatch({
        control,
        name: ['skala_dampak', 'skala_kemungkinan'], // Watch kedua field ini
    });


    useEffect(() => {
        // Pastikan nilai adalah angka sebelum melakukan perhitungan
        const d = Number(skala_dampak);
        const k = Number(skala_kemungkinan);

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
    }, [skala_dampak, skala_kemungkinan, setValue]);

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        const formData = {
            //key : value
            id_rencana_kinerja: data.id_rencana_kinerja || "-",
            nama_risiko: data.nama_risiko || "-",
            penyebab: data.penyebab || "-",
            akibat: data.akibat || "-",
            skala_dampak: Number(data.skala_dampak) || 0,
            skala_kemungkinan: Number(data.skala_kemungkinan) || 0,
            pembuat: {
                nama: data.nama_pegawai || "-",
                nip: data.pegawai_id || "-",
                golongan: "-",
            }
        };
        const success = await triggerPostAnalisa(formData);
        if (success) {
            toastSuccess(postMessage || "Berhasil Menyimpan Data");
            reset(); // Reset form setelah berhasil
            handleClose(); // Tutup modal setelah berhasil
            onSuccess();
        } else {
            toastError(postMessage || "Gagal Menyimpan Data");
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
        >
            <div className="w-max-[500px] py-2 border-b border-blue-500 text-center">
                <h1 className="text-xl uppercase font-semibold">Form Analisa {jenis}</h1>
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
                            label="Nama Pemilik Resiko"
                            type="text"
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
                            id="nama_rencana_kinerja"
                            label="Tahap Proses Bisnis"
                            type="text"
                            disable={true}
                        />
                    )}
                />
                <Controller
                    name="nama_risiko"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="nama_risiko"
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
                        name="skala_dampak"
                        control={control}
                        render={({ field }) => (
                            <FloatingLabelInput
                                {...field}
                                id="skala_dampak"
                                label="Dampak"
                                type="number"
                            />
                        )}
                    />
                    <Controller
                        name="skala_kemungkinan"
                        control={control}
                        render={({ field }) => (
                            <FloatingLabelInput
                                {...field}
                                id="skala_kemungkinan"
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
                        disabled={postProses}
                    >
                        {postProses ?
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