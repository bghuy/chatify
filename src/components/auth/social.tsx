'use client';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";

import { SocialLogin } from "@/actions/auth/login";
export const Social = () =>{
    const signInOauth = async(provider: "google" | "github") => {
        try {
            await SocialLogin(provider);
        } catch (error) {
            console.log(error);
        }

    }
    return(
        <div className="flex items-center w-full gap-x-2">
            <Button 
                size="lg"
                className="w-full"
                variant="outline"
                onClick={()=>{signInOauth('google')}}
            >
                <FcGoogle className="h-5 w-5"/>
            </Button>
            <Button 
                size="lg"
                className="w-full"
                variant="outline"
                onClick={()=>{signInOauth('github')}}
                disabled
            >
                <FaGithub className="h-5 w-5"/>
            </Button>
        </div>
    )
}