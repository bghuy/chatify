import axiosInstance from "@/setup/axios"
// import qs from "query-string"
export const getFirstServerByUserId = async() => {
    try {
        const res = await axiosInstance.get(`/server`)
        return res.data
    } catch (error) {
        throw error
    }
}


export const getAllServers = async() => {
    try {
        const res = await axiosInstance.get(`/server/all`)
        return res.data
    } catch (error) {
        console.log(error);
    }
}

export const getServerByServerId = async (serverId: string) => {
    try {
        const res = await axiosInstance.get(`/server/${serverId}`)
        return res.data
    } catch (error) {
        throw error
    }
}