'use client'

import { Modal } from "@/components/global/Modal";
import { useState, useEffect } from "react";
import { ButtonRed, ButtonSky } from "@/components/global/button";
import { JenisRisikoBody, RisikoResponse } from "@/app/types";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { FloatingLabelInput, FloatingLabelTextarea } from "@/components/global/input";
import { data } from "motion/react-client";

interface ModalJenisRisikoType {
    data?: RisikoResponse | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    jenis: "baru" | "edit" | "";
}

export const ModalJenisRisiko: React.FC<ModalJenisRisikoType> = ({ isOpen, onClose, onSuccess, jenis, data }) => {

    const { control, handleSubmit, reset } = useForm<JenisRisikoBody>({
        defaultValues: {
            jenis_risiko: data?.jenis_risiko || "",
            uraian: data?.uraian || "",
        }
    });

    const onSubmit: SubmitHandler<JenisRisikoBody> = async (data) => {
        const formData = {
            //key : value
            jenis_risiko: data.jenis_risiko || "-",
            uraian: data.uraian || "-",
        };
        console.log(formData);
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
            <div className="w-max-[500px] py-2 border-b border-blue-500 text-center">
                <h1 className="text-xl uppercase font-semibold">Form Jenis Risiko {jenis}</h1>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col mx-5 py-5 gap-2"
            >
                <Controller
                    name="jenis_risiko"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="jenis_risiko"
                            label="Jenis Risiko"
                            type="text"
                        />
                    )}
                />
                <Controller
                    name="uraian"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelTextarea
                            {...field}
                            id="uraian"
                            label="Uraian"
                        />
                    )}
                />
                <div className="flex flex-col gap-2 mt-3">
                    <ButtonSky
                        className="w-full"
                        type="submit"
                    >
                        {/* {postProses ?
                            <span className="flex">
                                <LoadingButtonClip />
                                Menyimpan...
                            </span>
                            :
                            "Simpan"
                        } */}
                        Simpan
                    </ButtonSky>
                    <ButtonRed className="w-full" type="button" onClick={handleClose}>
                        Batal
                    </ButtonRed>
                </div>
            </form>
        </Modal>
    )
}