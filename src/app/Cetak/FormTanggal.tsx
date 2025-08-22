'use client'

import { useForm, Controller } from "react-hook-form";
import { ButtonSky } from '@/components/global/button';
import { TbSignature, TbPrinter } from "react-icons/tb";

interface FormCetak {
    siapCetak: (tanggal: string) => void;
}
interface FormValue {
    tanggal: string | undefined;
}

export const FormTanggal: React.FC<FormCetak> = ({ siapCetak }) => {

    const { control, reset, handleSubmit, formState: {errors}} = useForm<FormValue>({});
    
    const onSubmit = (data: FormValue) => {
        siapCetak(data.tanggal ?? '');
        reset();
    }
    
    return (
        <div className='px-50 h-screen flex flex-col justify-center'>
            <div className="py-2 rounded-xl border border-blue-500 text-center">
                <h1 className="flex items-center justify-center gap-1 text-xl uppercase font-semibold text-blue-500">
                    <TbSignature />
                    Tanggal Tertanda
                </h1>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col py-5 gap-2 border border-blue-500 mt-2 px-5 rounded-xl"
            >
                <label htmlFor="tangal" className='text-slate-300 ml-3'>*Masukkan tanggal untuk pemberian waktu pada tanda tangan</label>
                <Controller
                    name="tanggal"
                    control={control}
                    rules={{ required: "wajib terisi" }}
                    render={({ field }) => (
                        <>
                            <input
                                {...field}
                                className="border rounded-lg p-3 border-gray-500"
                                id="tanggal"
                                type="date"
                            />
                            {errors.tanggal &&
                                <p className="text-red-400 italic text-sm">{errors.tanggal.message}</p>
                            }
                        </>
                    )}
                />
                <div className="flex flex-col gap-2 mt-3">
                    <ButtonSky
                        className="w-full flex items-center gap-1"
                        type="submit"
                    >
                        <TbPrinter />
                        Cetak
                    </ButtonSky>
                </div>
            </form>
        </div>
    )
}