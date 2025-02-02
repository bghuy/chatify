import axiosInstance from "@/setup/axios"
import { CreateChannelType } from "@/types/channel"
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


export const createChannel = async (serverId:string, channelData: CreateChannelType) => {
    try {
        const url = qs.stringifyUrl({
            url: "/channel",
            query: {
                serverId: serverId
            }
        })
        const res = await axiosInstance.post(url, channelData)
        return res.data
    } catch (error) {
        return null;
    }
}
export const updateChannel = async (serverId:string, channelId: string, channelData: CreateChannelType) => {
    try {
        const url = qs.stringifyUrl({
            url: `/channel/${channelId}`,
            query: {
                serverId: serverId
            }
        })
        const res = await axiosInstance.patch(url, channelData)
        return res.data
    } catch (error) {
        return null;
    }
}

export const deleteChannel = async (serverId:string, channelId: string) => {
    try {
        const url = qs.stringifyUrl({
            url: `/channel/${channelId}`,
            query: {
                serverId: serverId
            }
        })
        const res = await axiosInstance.delete(url)
        return res.data
    } catch (error) {
        return null;
    }
}