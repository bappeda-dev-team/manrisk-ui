'use client'

import { Modal } from "@/components/global/Modal"
import { ButtonRed, ButtonSky } from "@/components/global/button";
import { useEffect, useState } from "react";
import { LoadingButtonClip } from "@/components/global/loadingButton";
import { FloatingLabelInput, FloatingLabelTextarea } from "@/components/global/input";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from 'react-toastify';

interface ModalPemantauan {
    isOpen: boolean;
    onClose: () => void;
    data: FormValue;
}
interface FormValue {
    id_resiko: number;
    nama_pemilik_resiko: string;
    resiko_kecurangan_yang_dimitigasi: string;
    bentuk_kegiatan_pengendalian: string;
    penanggung_jawab: string;
    rencana_waktu_pelaksanaan: string;
    realisasi_waktu_pelaksanaan: string;
    progres_tindak_lanjut: string;
    bukti_pelaksanaan_tindak_lanjut: string;
    kendala: string;
    catatan: string;
}

export const ModalPemantauan: React.FC<ModalPemantauan> = ({ isOpen, onClose, data }) => {
    const DefaultValue = {
        nama_pemilik_resiko: '',
        resiko_kecurangan_yang_dimitigasi: '',
        bentuk_kegiatan_pengendalian: '',
        penanggung_jawab: '',
        rencana_waktu_pelaksanaan: '',
        realisasi_waktu_pelaksanaan: '',
        progres_tindak_lanjut: '',
        bukti_pelaksanaan_tindak_lanjut: '',
        kendala: '',
        catatan: '',
    }
    
    const { control, handleSubmit, reset } = useForm<FormValue>({
        defaultValues: DefaultValue
    });
    
    const [Proses, setProses] = useState<boolean>(false);
    
    useEffect(() => {
        if (isOpen) {
            reset({
                nama_pemilik_resiko: data.nama_pemilik_resiko,
                resiko_kecurangan_yang_dimitigasi: data.resiko_kecurangan_yang_dimitigasi,
                bentuk_kegiatan_pengendalian: data.bentuk_kegiatan_pengendalian,
                penanggung_jawab: data.penanggung_jawab,
                rencana_waktu_pelaksanaan: data.rencana_waktu_pelaksanaan,
                realisasi_waktu_pelaksanaan: data.realisasi_waktu_pelaksanaan,
                progres_tindak_lanjut: data.progres_tindak_lanjut,
                bukti_pelaksanaan_tindak_lanjut: data.bukti_pelaksanaan_tindak_lanjut,
                kendala: data.kendala,
                catatan: data.catatan,
            });
        } else {
            reset(DefaultValue);
        }
    }, [isOpen])
    
    const onSubmit: SubmitHandler<FormValue> = async (data: FormValue) => {
        const formData = {
            resiko_kecurangan_yang_dimitigasi: data.resiko_kecurangan_yang_dimitigasi,
            bentuk_kegiatan_pengendalian: data.bentuk_kegiatan_pengendalian,
            penanggung_jawab: data.penanggung_jawab,
            rencana_waktu_pelaksanaan: data.rencana_waktu_pelaksanaan,
            realisasi_waktu_pelaksanaan: data.realisasi_waktu_pelaksanaan,
            progres_tindak_lanjut: data.progres_tindak_lanjut,
            bukti_pelaksanaan_tindak_lanjut: data.bukti_pelaksanaan_tindak_lanjut,
            kendala: data.kendala,
            catatan: data.catatan,        
        }
        toast.success("Berhasil Menambahkan Data");
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
                <h1 className="text-xl uppercase">Form Pemantauan RTP</h1>
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
                            disable
                        />
                    )}
                />
                <Controller
                    name="resiko_kecurangan_yang_dimitigasi"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="resiko_kecurangan_yang_dimitigasi"
                            label="Resiko Kecurangan Yang Di Mitigasi"
                        />
                    )}
                />
                <Controller
                    name="bentuk_kegiatan_pengendalian"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="bentuk_kegiatan_pengendalian"
                            label="Bentuk Kegiatan Pengendalian"
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
                            label="Penanggung Jawab"
                        />
                    )}
                />
                <Controller
                    name="rencana_waktu_pelaksanaan"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="rencana_waktu_pelaksanaan"
                            label="Rencana Waktu Pelaksanaan Perlakuan Resiko"
                        />
                    )}
                />
                <Controller
                    name="realisasi_waktu_pelaksanaan"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="realisasi_waktu_pelaksanaan"
                            label="Realisasi Waktu Pelaksanaan Perlakuan Resiko"
                        />
                    )}
                />
                <Controller
                    name="progres_tindak_lanjut"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="progres_tindak_lanjut"
                            label="Progres Tindak Lanjut"
                        />
                    )}
                />
                <Controller
                    name="bukti_pelaksanaan_tindak_lanjut"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="bukti_pelaksanaan_tindak_lanjut"
                            label="Bukti Pelaksanaan Tindak Lanjut"
                        />
                    )}
                />
                <Controller
                    name="kendala"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="kendala"
                            label="Kendala"
                        />
                    )}
                />
                <Controller
                    name="catatan"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="catatan"
                            label="Catatan"
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