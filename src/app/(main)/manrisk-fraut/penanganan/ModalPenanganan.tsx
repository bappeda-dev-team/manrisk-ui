'use client'

import { Modal } from "@/components/global/Modal"
import { ButtonRed, ButtonSky } from "@/components/global/button";
import { useState, useEffect } from "react";
import { LoadingButtonClip } from "@/components/global/loadingButton";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FloatingLabelTextarea, FloatingLabelInput } from "@/components/global/input";
import { } from "react-toastify";
import useToast from "@/components/global/alert/toastAlert";
import { usePost } from "@/hook/usePost";
import { PenangananFraudPostValue, ResultPostResponse } from "@/app/types";
import { useBrandingContext } from "@/components/context/BrandingContext";

interface ModalPenanganan {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    data: PenangananFraudPostValue;
    jenis: "baru" | "edit" | "";
}

interface PostPenanganResponse {
    message: string;
}

export const ModalPenanganan: React.FC<ModalPenanganan> = ({ isOpen, onClose, onSuccess, jenis, data }) => {
    const { toastSuccess, toastError, toastInfo, toastWarning } = useToast();
    const {branding} = useBrandingContext();

    const [PostPenanganan, { data: PostPenangananData, proses: Proses, error: Error, message: MessagePost }] = usePost<PenangananFraudPostValue, ResultPostResponse>(
        jenis === 'baru' ? '/penanganan' : `/penanganan/${data.id_rencana_kinerja}`, jenis 
    );
    const { control, handleSubmit, reset } = useForm<PenangananFraudPostValue>({
        defaultValues: {
            id_rencana_kinerja: data.id_rencana_kinerja,
            nama_pegawai: data.nama_pegawai,
            pegawai_id: data.pegawai_id,
            nama_rencana_kinerja: data.nama_rencana_kinerja,
            existing_control: data.existing_control,
            jenis_perlakuan_risiko: data.jenis_perlakuan_risiko,
            rencana_perlakuan_risiko: data.rencana_perlakuan_risiko,
            biaya_perlakuan_risiko: data.biaya_perlakuan_risiko,
            target_waktu: data.target_waktu,
            pic: data.pic
        }
    });

    const handleClose = () => {
        onClose();
        reset();
    }

    const onSubmit: SubmitHandler<PenangananFraudPostValue> = async (data: PenangananFraudPostValue) => {
        const formData = {
            id_rencana_kinerja: data.id_rencana_kinerja,
            existing_control: data.existing_control,
            jenis_perlakuan_risiko: data.jenis_perlakuan_risiko,
            rencana_perlakuan_risiko: data.rencana_perlakuan_risiko,
            biaya_perlakuan_risiko: data.biaya_perlakuan_risiko,
            target_waktu: data.target_waktu,
            pic: data.pic,
            nip_pembuat: branding.nip,
        }
        // console.log(formData);
        const success = await PostPenanganan(formData);
        if(success && !Proses){
            toastSuccess(MessagePost || "berhasil menambahkan data");
            reset();
            handleClose();
            onSuccess();
        } else if(Error && !Proses) {
            toastError(MessagePost || "Gagal Menyimpan Data");
        }
        
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
                <h1 className="text-xl uppercase font-semibold">Form Pengendalian {jenis}</h1>
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
                            label="Nama Pemilik Risiko"
                            disable={true}
                        />
                    )}
                />
                <Controller
                    name="nama_rencana_kinerja"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="nama_rencana_kinerja"
                            label="Tahap Proses Bisnis"
                            disable
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
                    name="rencana_perlakuan_risiko"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="rencana_perlakuan_risiko"
                            label="Rencana Perlakuan Risiko"
                        />
                    )}
                />
                <Controller
                    name="jenis_perlakuan_risiko"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="jenis_perlakuan_risiko"
                            label="Jenis Perlakuan risiko"
                        />
                    )}
                />
                <Controller
                    name="biaya_perlakuan_risiko"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="biaya_perlakuan_risiko"
                            label="Biaya Perlakuan risiko"
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
                    name="pic"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="pic"
                            label="Penanggung Jawab (PIC)"
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