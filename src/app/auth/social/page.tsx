'use client';

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { getUserProfile } from "@/services/auth";
import { signOutUser } from "@/actions/auth/signOut";
import ChatifyLoader from "@/components/auth/ChatifyLoader";

const SocialLoginComponent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const access_token = searchParams?.get("access_token") || null;

    useEffect(() => {
        const handleSocialLogin = async () => {
            if (access_token) {
                try {
                    const decodedToken = jwt.decode(access_token) as jwt.JwtPayload;
                    const expirationTime = decodedToken?.exp
                        ? new Date(decodedToken.exp * 1000)
                        : new Date(Date.now() + 3600 * 1000);

                    Cookies.set("access_token", access_token, {
                        path: "/",
                        expires: expirationTime,
                    });
                    const res = await getUserProfile();
                    const userProfile = res?.profile;
                    if (!userProfile) {
                        await signOutUser();
                        router.push("/auth/login");
                    }
                    router.push("/setup");
                } catch (error) {
                    console.error("Error during social login:", error);
                    router.push("/");
                }
            } else {
                router.push("/");
            }
        };

        handleSocialLogin();
    }, [access_token, router]);

    return null;
};
const SocialLoginPage = () => (
    <Suspense fallback={            
        <div className="flex items-center justify-center min-h-screen bg-[#36393f]">
            <ChatifyLoader/>
        </div>
    }>
        <SocialLoginComponent />
    </Suspense>
);

export default SocialLoginPage;
