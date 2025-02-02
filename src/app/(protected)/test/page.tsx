'use client'

import { Button } from "@/components/ui/button"
import axiosInstance from "@/setup/axios";
import { decodeJwt } from "jose";
export default function TestPage () {
    const getCookie = async () => {
        const response = await fetch('https://chat-asp-api.vercel.app/auth/test-cookie', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        // console.log(response, "response");
        const data = await response.json();
        console.log(data, "data");

        const response2 = await axiosInstance.get('/auth/test-cookie');
        console.log(response2.data, "data2");

        const response3 = await fetch(`https://chat-asp-api.vercel.app/auth/refresh-token`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const data3 = await response3.json();
        console.log(data3.data.access_token,"data");
        const newAccessToken = data3?.data?.access_token;
        const decodedToken = decodeJwt(newAccessToken);
        console.log(decodedToken,"decodedToken");
    }
    
    return(
        <>
            <div>Hello test</div>
            <Button variant="link" onClick={getCookie}>
                Get test cookie
            </Button>
        </>
    )
}
 