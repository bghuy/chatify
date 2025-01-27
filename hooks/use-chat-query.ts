import qs from "query-string"
import {useInfiniteQuery } from "@tanstack/react-query"

import { useSocket } from "@/components/providers/socket-provider"
import axiosInstance from "@/setup/axios";
interface ChatQueryProps {
    queryKey: string;
    apiUrl: string;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
}


export const useChatQuery = ({
    queryKey,
    apiUrl,
    paramKey,
    paramValue
}: ChatQueryProps) => {
    const {isConnected} = useSocket();
    const fetchMessages = async({pageParam = undefined}) =>{
        const url = qs.stringifyUrl({
            url: apiUrl,
            query: {
                cursor: pageParam,
                [paramKey]: paramValue
            }
        }, {skipNull: true})
        const response = await axiosInstance.get(url);
        console.log(response?.data, "dat");
        
        return response?.data;
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,

    } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchMessages,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        refetchInterval: isConnected? false: 1000,
        initialPageParam: undefined,
    })
    return{
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    }
}

