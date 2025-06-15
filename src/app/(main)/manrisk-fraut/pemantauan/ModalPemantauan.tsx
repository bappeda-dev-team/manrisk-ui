'use client'

import { Modal } from "@/components/global/Modal"
import { ButtonRed, ButtonSky } from "@/components/global/button";
import { useState } from "react";
import { LoadingButtonClip } from "@/components/global/loadingButton";
import { FloatingLabelInput, FloatingLabelTextarea } from "@/components/global/input";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from 'react-toastify';

interface ModalPemantauan {
    isOpen: boolean;
    onClose: () => void;
}
interface FormValue {
    nama_resiko_fraud: string;
    deskripsi_kegiatan_pengendalian: string;
    penanggung_jawab: string;
    realisasi_waktu_pelaksanaan: string;
    progres_tindak_lanjut: string;
    dampak: string;
    kemungkinan: string;
    bukti_pelaksanaan_tindak_lanjut: string;
    kendala: string;
    catatan: string;
}

export const ModalPemantauan: React.FC<ModalPemantauan> = ({ isOpen, onClose }) => {

    const { control, handleSubmit, reset } = useForm<FormValue>({
        defaultValues: {
            nama_resiko_fraud: '',
            deskripsi_kegiatan_pengendalian: '',
            penanggung_jawab: 'Otomatis dari table sebelumnya',
            realisasi_waktu_pelaksanaan: '',
            progres_tindak_lanjut: '',
            dampak: '',
            kemungkinan: '',
            bukti_pelaksanaan_tindak_lanjut: '',
            kendala: '',
            catatan: ''
        }
    });

    const [Proses, setProses] = useState<boolean>(false);

    const onSubmit: SubmitHandler<FormValue> = async (data: FormValue) => {
        const formData = {
            nama_resiko_fraud: data.nama_resiko_fraud,
            deskripsi_kegiatan_pengendalian: data.deskripsi_kegiatan_pengendalian,
            penanggung_jawab: data.penanggung_jawab,
            realisasi_waktu_pelaksanaan: data.realisasi_waktu_pelaksanaan,
            progres_tindak_lanjut: data.progres_tindak_lanjut,
            dampak: data.dampak,
            kemungkinan: data.kemungkinan,
            bukti_pelaksanaan_tindak_lanjut: data.bukti_pelaksanaan_tindak_lanjut,
            kendala: data.kendala,
            catatan: data.catatan
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
                <h1 className="text-xl uppercase">Form Pemantauan</h1>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col mx-5 py-5 gap-2"
            >
                <Controller 
                    name="nama_resiko_fraud"
                    control={control}
                    render={({field}) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="nama_resiko_fraud"
                            label="Nama Resiko Fraud"
                        />
                    )}
                />
                <Controller 
                    name="deskripsi_kegiatan_pengendalian"
                    control={control}
                    render={({field}) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="deskripsi_kegiatan_pengendalian"
                            label="Deskripsi Kegiatan Pengendalian"
                        />
                    )}
                />
                <Controller 
                    name="realisasi_waktu_pelaksanaan"
                    control={control}
                    render={({field}) => (
                        <FloatingLabelInput
                            {...field}
                            id="realisasi_waktu_pelaksanaan"
                            label="Realisasi Waktu Pelaksanaan"
                        />
                    )}
                />
                <Controller
                    name="progres_tindak_lanjut"
                    control={control}
                    render={({field}) => (
                        <FloatingLabelInput
                            {...field}
                            id="progres_tindak_lanjut"
                            label="Progres Tindak Lanjut"
                        />
                    )}
                />
                <div className="grid border p-2 rounded-lg grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
                    <Controller
                        name="dampak"
                        control={control}
                        render={({field}) => (
                            <FloatingLabelInput
                                {...field}
                                id="dampak"
                                label="Dampak"
                            />
                        )}
                    />
                    <Controller
                        name="kemungkinan"
                        control={control}
                        render={({field}) => (
                            <FloatingLabelInput
                                {...field}
                                id="kemungkinan"
                                label="Kemungkinan"
                            />
                        )}
                    />
                    <div className="flex items-center gap-1">
                        <div className="flex flex-col py-2 w-full">
                            <div className="border border-gray-300 px-4 py-2 rounded-lg bg-green-500 text-white">Tingkat Resiko</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="flex flex-col py-2 w-full">
                            <div className="border border-gray-300 px-4 py-2 rounded-lg bg-green-500 text-white">Level Resiko</div>
                        </div>
                    </div>
                </div>
                <Controller
                    name="bukti_pelaksanaan_tindak_lanjut"
                    control={control}
                    render={({field}) => (
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
                    render={({field}) => (
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
                    render={({field}) => (
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