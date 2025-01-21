import axiosInstance from "@/setup/axios"
import { MemberRole } from "@/types/member";
import { CreateServerType, UpdateServerType } from "@/types/server";
import qs from "query-string"
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

export const deleteServer = async (serverId: string) => {
    try {
        const res = await axiosInstance.delete(`/server/${serverId}`)
        return res.data
    } catch (error) {
        return null;
    }
}

export const updateServer = async (serverId: string, updateServerData: UpdateServerType) => {
    try {
        const res = await axiosInstance.patch(`/server/${serverId}`, updateServerData)
        return res.data
    } catch (error) {
        return null;
    }
}

export const generateNewInviteCode = async (serverId: string) => {
    try {
        const res = await axiosInstance.patch(`/server/${serverId}/invite-code`)
        return res.data
    } catch (error) {
        return null;
    }
}

export const joinServer = async (inviteCode: string) => {
    try {
        const res = await axiosInstance.patch(`/server/join-server`, { inviteCode })
        return res.data
    } catch (error) {
        return null;
    }
}

export const updateMemberRole = async (serverId: string, memberId: string, role: MemberRole) => {
    try {
        const url = qs.stringifyUrl({
            url: `/member/${memberId}`,
            query: {
                serverId: serverId,
            }
        })
        const res = await axiosInstance.patch(url, {role});
        return res.data
    } catch (error) {
        throw error
    }
}

export const deleteMemberInServer = async (serverId: string, memberId: string) => {
    try {
        const url = qs.stringifyUrl({
            url: `/member/${memberId}`,
            query: {
                serverId: serverId,
            }
        })
        const res = await axiosInstance.delete(url);
        return res.data
    } catch (error) {
        throw error
    }
}