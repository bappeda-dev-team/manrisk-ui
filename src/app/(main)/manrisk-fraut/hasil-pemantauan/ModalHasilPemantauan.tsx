'use client'

import { Modal } from "@/components/global/Modal"
import { ButtonRed, ButtonSky } from "@/components/global/button";
import { useState, useEffect } from "react";
import { LoadingButtonClip } from "@/components/global/loadingButton";
import { FloatingLabelInput, FloatingLabelTextarea } from "@/components/global/input";
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form";
import useToast from "@/components/global/alert/toastAlert";
import { HasilPemantauanFraudPostValue, ResultPostResponse } from "@/app/types";
import { useBrandingContext } from "@/components/context/BrandingContext";
import { usePost } from "@/hook/usePost";

interface ModalPemantauan {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    jenis: "baru" | "edit" | "";
    data: HasilPemantauanFraudPostValue;
}

export const ModalHasilPemantauan: React.FC<ModalPemantauan> = ({ isOpen, onClose, data, onSuccess, jenis }) => {
    const DefaultValue = {
        id_rencana_kinerja: data.id_rencana_kinerja,
        risiko_kecurangan: data.risiko_kecurangan,
        deskripsi_kegiatan_pengendalian: data.deskripsi_kegiatan_pengendalian,
        skala_dampak: data.skala_dampak,
        skala_kemungkinan: data.skala_kemungkinan,
        catatan: data.catatan,
    }
    const { reset, control, handleSubmit, setValue } = useForm<HasilPemantauanFraudPostValue>({
        defaultValues: DefaultValue
    });

    const { branding } = useBrandingContext();
    const [Proses, setProses] = useState<boolean>(false);
    const [TingkatResiko, setTingkatResiko] = useState<number>(0);
    const [LevelResiko, setLevelResiko] = useState<string>('');
    const { toastSuccess, toastError, toastInfo, toastWarning } = useToast()

    const [skala_dampak, skala_kemungkinan] = useWatch({
        control,
        name: ['skala_dampak', 'skala_kemungkinan'], // Watch kedua field ini
    });

    const [sendData, { data: HasilData, proses, error, message }] = usePost<HasilPemantauanFraudPostValue, ResultPostResponse>(jenis === 'baru' ? '/hasil-pemantauan' : `/hasil-pemantauan/${data.id_rencana_kinerja}`, jenis);


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

    const onSubmit: SubmitHandler<HasilPemantauanFraudPostValue> = async (data) => {
        const formData = {
            //key : value
            id_rencana_kinerja: data.id_rencana_kinerja,
            skala_dampak: Number(data.skala_dampak) || 0,
            skala_kemungkinan: Number(data.skala_kemungkinan) || 0,
            nip_pembuat: branding.nip,
        };
        // console.log(formData);
        const success = await sendData(formData);
        if (success && !proses) {
            toastSuccess("Berhasil Menyimpan Data");
            reset(); // Reset form setelah berhasil
            handleClose(); // Tutup modal setelah berhasil
            onSuccess();
        } else if (error && !proses) {
            toastError(message || "Gagal Menyimpan Data");
        }
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
                <h1 className="text-xl uppercase font-semibold">Form Hasil Pemantauan {jenis}</h1>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col mx-5 py-5 gap-2"
            >
                <Controller
                    name="risiko_kecurangan"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="resiko_kecuarangan"
                            label="Resiko Kecurangan Yang Dimitigasi"
                            disable
                        />
                    )}
                />
                <Controller
                    name="deskripsi_kegiatan_pengendalian"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="deskripsi_kegiatan_pengendalian"
                            label="Bentuk Kegiatan Pengendalian"
                            disable
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
                <Controller
                    name="catatan"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="catatan"
                            label="Catatan"
                            disable
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