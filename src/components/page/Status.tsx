import { TbCircleCheck, TbCircleX, TbHourglassFilled } from "react-icons/tb";
import React from "react";

interface Status {
    status: string;
    catatan: string;
}

export const Status: React.FC<Status> = ({ status, catatan }) => {
    return (
        <div className="flex flex-col gap-2">
            {status === 'disetujui' &&
                <React.Fragment>
                    <div className="flex items-center gap-1 bg-green-400 text-white p-1 border rounded-xl justify-center">
                        <TbCircleCheck />
                        <p>Terverivikasi</p>
                    </div>
                    <p className="text-center">{catatan || '-'}</p>
                </React.Fragment>
            }
            {status === 'ditolak' &&
                <React.Fragment>
                    <div className="flex items-center gap-1 bg-red-400 text-white p-1 border rounded-xl justify-center">
                        <TbCircleX />
                        <p>Ditolak</p>
                    </div>
                    <p className="text-center">{catatan || '-'}</p>
                </React.Fragment>
            }
            {status === 'pending' &&
                <React.Fragment>
                    <div className="flex items-center gap-1 bg-gray-400 text-white p-1 border rounded-xl justify-center">
                        <TbHourglassFilled />
                        <p>Pending</p>
                    </div>
                </React.Fragment>
            }
        </div>
    )
} 