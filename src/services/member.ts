import axiosInstance from "@/setup/axios";

export const getMemberOfCurrentUserById = async (serverId: string) => {
    try {
        const res = await axiosInstance.get(`/member/${serverId}`)
        return res.data
    } catch (error) {
        return null;
    }
}