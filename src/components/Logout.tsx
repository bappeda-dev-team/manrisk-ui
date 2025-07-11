
'use client'

import { Button } from "@mui/material";
import { TbLogout } from "react-icons/tb";
import { useEffect, useState } from 'react'

export default function Logout() {
    const [csrfToken, setCsrfToken] = useState<string>("");

    useEffect(() => {
        // find token
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];

        if (cookieValue) {
            setCsrfToken(decodeURIComponent(cookieValue))
        }
    }, [])

    return (
        <form action="/logout" method="POST">
            <input type="hidden" name="_csrf" value={csrfToken} />
            <Button
                className="flex items-center gap-1"
                variant="outlined"
                type="submit"
                color="error">
                <TbLogout />
                LOGOUT
            </Button>
        </form>
    )
}
