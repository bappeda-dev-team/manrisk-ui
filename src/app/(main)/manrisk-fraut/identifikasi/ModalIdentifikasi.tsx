'use client'

import { Modal } from "@/components/global/Modal"
import { ButtonRed, ButtonSky } from "@/components/global/button";
import { useEffect, useState } from "react";
import { LoadingButtonClip } from "@/components/global/loadingButton";
import { FloatingLabelInput, FloatingLabelTextarea, FloatingLabelSelect } from "@/components/global/input";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import useToast from "@/components/global/alert/toastAlert";
import Select from "react-select";
import { usePost } from "@/hook/usePost";
import { ResultPostResponse, IdentifikasiFraudPost } from "@/app/types";
import { useBrandingContext } from "@/components/context/BrandingContext";

interface ModalIdentifikasiProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    data: IdentifikasiFraudPost;
    jenis: "baru" | "edit" | "";
}

export const ModalIdentifikasi: React.FC<ModalIdentifikasiProps> = ({ isOpen, onClose, data, jenis, onSuccess }) => {

    const { branding } = useBrandingContext();

    const DefaultValue = {
        id_rencana_kinerja: data.id_rencana_kinerja || '',
        nama_pegawai: data.nama_pegawai || '',
        strategi: data.strategi || '',
        nama_rencana_kinerja: data.nama_rencana_kinerja || '',
        nama_risiko: data.nama_risiko || '',
        jenis_risiko: data.jenis_risiko || '',
        uraian: data.uraian || "",
        kemungkinan_kecurangan: data.kemungkinan_kecurangan || '',
        indikasi: data.indikasi || '',
        kemungkinan_pihak_terkait: data.kemungkinan_pihak_terkait || '',
    }
    const { control, reset, handleSubmit } = useForm<IdentifikasiFraudPost>({
        defaultValues: DefaultValue
    });
    const [sendData, { data: HasilData, proses, error, message }] = usePost<IdentifikasiFraudPost, ResultPostResponse>(jenis === 'baru' ? '/identifikasi' : `/identifikasi/${data.id_rencana_kinerja}`, jenis);

    const { toastSuccess, toastError, toastInfo, toastWarning } = useToast();

    const handleClose = () => {
        onClose();
        reset();
    }

    const onSubmit: SubmitHandler<IdentifikasiFraudPost> = async (dataValue: IdentifikasiFraudPost) => {
        const formData = {
            id_rencana_kinerja: dataValue.id_rencana_kinerja,
            nama_risiko: dataValue.nama_risiko,
            jenis_risiko: dataValue.jenis_risiko,
            kemungkinan_kecurangan: dataValue.kemungkinan_kecurangan,
            strategi: "-",
            uraian: "-",
            indikasi: dataValue.indikasi,
            kemungkinan_pihak_terkait: dataValue.kemungkinan_pihak_terkait,
            nip_pembuat: branding.nip,
        }
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
                            label="Pemilik Risiko"
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
                        <FloatingLabelInput
                            {...field}
                            id="jenis_risiko"
                            label="Jenis Risiko"
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
                        {proses ?
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