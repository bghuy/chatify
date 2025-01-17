import axiosInstance from "@/setup/axios"
import { CreateServerType } from "@/types/server";
// import qs from "query-string"
export const getFirstServerByUserId = async() => {
    try {
        const res = await axiosInstance.get(`/server`)
        return res.data
    } catch (error) {
        return null;
    }
}


export const getAllServers = async() => {
    try {
        const res = await axiosInstance.get(`/server/all`)
        return res.data
    } catch (error) {
        return [];
    }
}

export const getServerByServerId = async (serverId: string) => {
    try {
        const res = await axiosInstance.get(`/server/${serverId}`)
        return res.data
    } catch (error) {
        return null;
    }
}

export const createNewServer = async (createServerData: CreateServerType) => {
    try {
        const res = await axiosInstance.post(`/server`, createServerData)
        return res.data
    } catch (error) {
        return null;
    }
}