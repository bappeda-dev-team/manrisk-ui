'use client'

import { Modal } from "@/components/global/Modal"
import { ButtonRed, ButtonSky } from "@/components/global/button";
import { useState, useEffect } from "react";
import { LoadingButtonClip } from "@/components/global/loadingButton";
import { FloatingLabelInput, FloatingLabelTextarea } from "@/components/global/input";
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form";
import useToast from "@/components/global/alert/toastAlert";

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
    dampak: number,
    kemungkinan: number,
    catatan: string;
    status: string;
    catatan_status: string;
}

export const ModalHasilPemantauan: React.FC<ModalPemantauan> = ({ isOpen, onClose, data }) => {
    const DefaultValue = {
        nama_pemilik_resiko: '',
        resiko_kecurangan_yang_dimitigasi: '',
        bentuk_kegiatan_pengendalian: '',
        dampak: 0,
        kemungkinan: 0,
        catatan: '',
    }
    const { reset, control, handleSubmit, setValue } = useForm<FormValue>({
        defaultValues: DefaultValue
    });

    useEffect(() => {
        if (isOpen) {
            reset({
                nama_pemilik_resiko: data.nama_pemilik_resiko,
                resiko_kecurangan_yang_dimitigasi: data.resiko_kecurangan_yang_dimitigasi,
                bentuk_kegiatan_pengendalian: data.bentuk_kegiatan_pengendalian,
                dampak: data.dampak,
                kemungkinan: data.kemungkinan,
                catatan: data.catatan,
            });
        } else {
            reset(DefaultValue)
        }
    }, [isOpen]);

    const [Proses, setProses] = useState<boolean>(false);
    const [TingkatResiko, setTingkatResiko] = useState<number>(0);
    const [LevelResiko, setLevelResiko] = useState<string>('');
    const { toastSuccess, toastError, toastInfo, toastWarning } = useToast()

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
            resiko_kecurangan_yang_dimitigasi: data.resiko_kecurangan_yang_dimitigasi || "-",
            bentuk_kegiatan_pengendalian: data.bentuk_kegiatan_pengendalian || "-",
            dampak: Number(data.dampak) || 0,
            kemungkinan: Number(data.kemungkinan) || 0,
            catatan: data.catatan
        };
        console.log(formData);
        toastSuccess("Berhasil Menyimpan Data");
        handleClose();
    }

    const handleClose = () => {
        onClose();
        reset();
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="w-max-[500px] py-2 border-b text-center border-blue-500">
                <h1 className="text-xl uppercase font-semibold">Form Hasil Pemantauan</h1>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col mx-5 py-5 gap-2"
            >
                <Controller
                    name="resiko_kecurangan_yang_dimitigasi"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="resiko_kecuarangan_yang_dimitigasi"
                            label="Resiko Kecurangan Yang Dimitigasi"
                            disable
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
                            disable
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