import axiosInstance from "@/setup/axios"
import qs from "query-string"
export const getChannelByChannelId = async (channelId:string) => {
    try {
        const url = qs.stringifyUrl({
            url: `/channel/${channelId}`,
        })
        const res = await axiosInstance.get(url)
        return res.data
    } catch (error) {
        return null;
    }
}