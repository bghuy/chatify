"use client"
import {RegisterByCredentials } from "@/services/auth";

export const LocalRegister = async (email: string, password: string, name: string) => {
    try {
        if(!email || !password){
            throw new Error("Invalid credentials!");
        }
        const response = await RegisterByCredentials(email, password, name);
        return response;
    } catch (error) {
        throw error;
    }
}