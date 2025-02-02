"use client"
import { LoginByCredentials, LoginWithGoogle } from "@/services/auth";

export const LocalLogin = async (email: string, password: string) => {
    try {
        if(!email || !password){
            throw new Error("Invalid credentials!");
        }
        const response = await LoginByCredentials(email, password);
        return response;
    } catch (error) {
        throw error;
    }
}

export const SocialLogin = async (provider: "google" | "github") => {
    try {
        switch (provider) {
            case "google":
                await LoginWithGoogle();
                break;
            default:
                throw new Error("Invalid provider");
        }
        
    } catch (error) {
        throw error;
    }
}