
import axiosInstance from "@/setup/axios";
import qs from "query-string"
export const getOrCreateConversation = async (memberOneId: string, memberTwoId: string) =>{
    let conversation = await findConversation(memberOneId, memberTwoId) || await findConversation(memberTwoId,memberOneId);
    
    if(!conversation){
        conversation = await createNewConversation(memberOneId,memberTwoId)
    }

    return conversation;
}

const findConversation = async (memberOneId: string, memberTwoId: string)=>{
    try {
        const url = qs.stringifyUrl({
            url: "/conversation",
            query: {
                memberOneId,
                memberTwoId
            }
        })
        const res = await axiosInstance.get(url);
        return res?.data?.conversation;
    } catch (error) {
        return null
    }
}

const createNewConversation = async (memberOneId: string, memberTwoId: string) =>{
    try {
        const res = await axiosInstance.post("/conversation",{
            memberOneId,
            memberTwoId
        })
        return res?.data?.conversation;
    } catch (error) {
        return null;
    }
}

