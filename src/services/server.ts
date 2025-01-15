import axiosInstance from "@/setup/axios"
// import qs from "query-string"
export const getFirstServerByUserId = async(userId: string) => {
    try {
        const res = await axiosInstance.get(`/server/${userId}`)
        return res.data
    } catch (error) {
        throw error
    }
}