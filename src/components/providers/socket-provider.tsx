"use client"

import { createContext, useContext, useEffect, useState } from "react";
import ClientIO from "socket.io-client";  // Use default import
type SocketContextType = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket: any | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false
})

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [socket, setSocket] = useState<any>(null); // Add type for socket
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_MODE === 'production' ? process.env.NEXT_PUBLIC_SERVER_PRODUCTION_URL_CHAT_WS : process.env.NEXT_PUBLIC_SERVER_DEVELOPMENT_URL_CHAT_WS
        const socketInstance = ClientIO(baseUrl, {  // No need for "new" keyword
            // path: "/api/socket/io",
            // addTrailingSlash: false
        });
        // const socketInstance = io("http://localhost:8080", {
        //     // path: "/api/socket/io",
        //     // addTrailingSlash: false
        // });
        

        socketInstance.on("connect", () => {
            console.log("Connected");
            
            setIsConnected(true);
        });

        socketInstance.on("disconnect", () => {
            console.log("Disconnected");
            
            setIsConnected(false);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    )
}
