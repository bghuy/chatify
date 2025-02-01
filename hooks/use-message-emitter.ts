"use client"
import { useCallback } from 'react';
import { useSocket } from "@/components/providers/socket-provider";
import Cookies from 'js-cookie';
interface UseMessageEmitterProps {
  queryKey: string;
}
// interface ChatQueryRequest {
//     content?: string;
//     fileUrl?: string;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     metadata?: Record<string, any>;
// }

export const useMessageEmitter = ({ queryKey }: UseMessageEmitterProps) => {
  const { socket } = useSocket();
  const getAccessToken = useCallback(() => {
    return Cookies.get('access_token');
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const emitMessage = useCallback((messageData: any) => {
    if(!messageData?.content && !messageData?.fileUrl) return;
    if (socket) {
      const access_token = getAccessToken();
        socket.emit(
          queryKey, 
          {
            ...messageData,
            access_token
          }
        );
    }
  }, [getAccessToken, queryKey, socket]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const emitUpdateMessage = useCallback((messageData: any) => {
    if(!messageData?.deleted && !messageData?.content) return;
    if (socket) {
      const access_token = getAccessToken();
        socket.emit(
          queryKey, 
          {
            ...messageData,
            access_token
          }
        );
    }
  }, [getAccessToken, queryKey, socket]);
  return {
    emitMessage,
    emitUpdateMessage
  };
};