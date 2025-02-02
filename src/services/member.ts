import axiosInstance from "@/setup/axios";
import qs from "query-string"
export const getMemberOfCurrentUserById = async (serverId: string) => {
    try {
        const res = await axiosInstance.get(`/member/${serverId}`)
        return res.data
    } catch (error) {
        return null;
    }
}

export const getCurrentMemberInServer = async (serverId: string) => {
    try {
        const url = qs.stringifyUrl({
            url: "/member",
            query: {
                serverId: serverId
            }
        })
        const res = await axiosInstance.get(url)
        return res.data
    } catch (error) {
        return null;
    }
}