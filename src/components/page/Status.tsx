import { TbCircleCheck, TbCircleX, TbHourglassFilled, TbFileIsr } from "react-icons/tb";
import React from "react";

interface Status {
    status: string;
    catatan: string;
}

export const Status: React.FC<Status> = ({ status, catatan }) => {
    return (
        <div className="flex flex-col gap-2">
            {status === 'APPROVED' &&
                <React.Fragment>
                    <div className="flex items-center gap-1 bg-green-400 text-white p-1 border rounded-xl justify-center">
                        <TbCircleCheck />
                        <p>{status}</p>
                    </div>
                    <p className="text-center">{catatan || '-'}</p>
                </React.Fragment>
            }
            {status === 'REJECTED' &&
                <React.Fragment>
                    <div className="flex items-center gap-1 bg-red-400 text-white p-1 border rounded-xl justify-center">
                        <TbCircleX />
                        <p>{status}</p>
                    </div>
                    <p className="text-center">{catatan || '-'}</p>
                </React.Fragment>
            }
            {(status === 'PENDING' || status === '') &&
                <React.Fragment>
                    <div className="flex items-center gap-1 bg-gray-400 text-white p-1 border rounded-xl justify-center">
                        <TbHourglassFilled />
                        <p>{status || "PENDING"}</p>
                    </div>
                </React.Fragment>
            }
            {status === 'DRAFTED' &&
                <React.Fragment>
                    <div className="flex items-center gap-1 bg-gray-400 text-white p-1 border rounded-xl justify-center">
                        <TbFileIsr />
                        <p>{status}</p>
                    </div>
                </React.Fragment>
            }
        </div>
    )
} 