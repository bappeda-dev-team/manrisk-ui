'use client'

import { Modal } from "@/components/global/Modal"
import { ButtonRed, ButtonSky } from "@/components/global/button";
import { LoadingButtonClip } from "@/components/global/loadingButton";
import { FloatingLabelInput, FloatingLabelTextarea } from "@/components/global/input";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import useToast from "@/components/global/alert/toastAlert";
import { usePost } from "@/hook/usePost";
import { PemantauanFraudPostValue, ResultPostResponse } from "@/app/types";

interface ModalPemantauan {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void
    Data: PemantauanFraudPostValue;
    jenis: "baru" | "edit" | "";
}

export const ModalPemantauan: React.FC<ModalPemantauan> = ({ isOpen, onClose, onSuccess, jenis, Data }) => {

    const { toastSuccess, toastError, toastWarning, toastInfo } = useToast();
    const { control, handleSubmit, reset } = useForm<PemantauanFraudPostValue>({
        defaultValues: {
            id_rencana_kinerja: Data.id_rencana_kinerja,
            pemilik_risiko: Data.nama_pegawai,
            risiko_kecurangan: Data.risiko_kecurangan,
            deskripsi_kegiatan_pengendalian: Data.deskripsi_kegiatan_pengendalian,
            pic: Data.pic,
            rencana_waktu_pelaksanaan: Data.rencana_waktu_pelaksanaan,
            realisasi_waktu_pelaksanaan: Data.realisasi_waktu_pelaksanaan,
            progres_tindak_lanjut: Data.progres_tindak_lanjut,
            bukti_pelaksanaan_tindak_lanjut: Data.bukti_pelaksanaan_tindak_lanjut,
            kendala: Data.kendala,
            catatan: Data.catatan,
            pembuat: {
                nama: Data.nama_pegawai,
                nip: Data.pegawai_id,
                golongan: "-"
            }
        }
    });

    const [postPemantauan, { data, proses, error, message }] = usePost<PemantauanFraudPostValue, ResultPostResponse>(
        jenis === "baru" ? `/pemantauan` : `/pemantauan/${Data.id_rencana_kinerja}`,
        jenis
    )

    const onSubmit: SubmitHandler<PemantauanFraudPostValue> = async (data: PemantauanFraudPostValue) => {
        const formData = {
            id_rencana_kinerja: data.id_rencana_kinerja,
            pemilik_risiko: data.nama_pegawai || "-",
            risiko_kecurangan: data.risiko_kecurangan,
            deskripsi_kegiatan_pengendalian: data.deskripsi_kegiatan_pengendalian,
            pic: data.pic,
            rencana_waktu_pelaksanaan: data.rencana_waktu_pelaksanaan,
            realisasi_waktu_pelaksanaan: data.realisasi_waktu_pelaksanaan,
            progres_tindak_lanjut: data.progres_tindak_lanjut,
            bukti_pelaksanaan_tindak_lanjut: data.bukti_pelaksanaan_tindak_lanjut,
            kendala: data.kendala,
            catatan: data.catatan,
            pembuat: {
                nama: data.nama_pegawai || "-",
                nip: data.pegawai_id || "-",
                golongan: "-"
            }
        }
        // console.log(formData);
        const success = await postPemantauan(formData);
        if (success && !proses) {
            toastSuccess(message || "berhasil menambahkan data");
            reset();
            handleClose();
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
                <h1 className="text-xl uppercase font-semibold">Form Pemantauan RTP {jenis}</h1>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col mx-5 py-5 gap-2"
            >
                <Controller
                    name="pemilik_risiko"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="pemilik_risiko"
                            label="Nama Pemilik Risiko"
                            disable
                        />
                    )}
                />
                <Controller
                    name="risiko_kecurangan"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="risiko_kecurangan"
                            label="Risiko Kecurangan Yang Di Mitigasi"
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
                            label="Rencana Waktu Pelaksanaan Perlakuan Risiko"
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
                            label="Realisasi Waktu Pelaksanaan Perlakuan Risiko"
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