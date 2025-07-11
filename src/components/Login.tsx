'use client'

import { Button } from "@mui/material";
import { TbLogin } from "react-icons/tb";
import { useApiUrlContext } from '@/components/context/ApiUrlContext'

export default function Login() {
    const { url_login } = useApiUrlContext();
    return (
        <Button
            className="flex items-center gap-1"
            variant="outlined"
            color="info"
            onClick={() => window.location.href = url_login}
        >
            <TbLogin />
            LOGIN
        </Button>
    )
}
