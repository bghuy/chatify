
import { Hash } from "lucide-react"
import { MobileToggle } from "../mobile-toggle";
import { UserAvatar } from "../user-avatar";
import { SocketIndicator } from "../socket-indicator";
// import { ChatVideoButton } from "./chat-video-button";
import { ChatVideoWrapper } from "./ChatVideoButtonWrapper";
import { cn } from "@/lib/utils";

interface ChatHeaderProps {
    serverId: string;
    name: string | null;
    type: "channel" | "conversation";
    imageUrl?: string | null
}

export const ChatHeader = ({
    serverId,
    name,
    type,
    imageUrl
}: ChatHeaderProps) => {
    return (
        <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 ">
            <MobileToggle serverId={serverId} />
            {type === "channel" && (
                <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2"/>
            )}
            {type === "conversation" && (
                imageUrl
                ?
                <UserAvatar 
                    src={imageUrl}
                    className="h-8 w-8 md:h-8 md:w-8"
                />
                :
                <div
                    className={cn(
                        "relative flex h-[32px] w-[32px] rounded-full overflow-hidden"
                    )}
                >
                    <div className="h-full w-full flex items-center justify-center bg-slate-50 text-black">
                        {name?.charAt(0).toUpperCase()}
                    </div>
                </div>
            )}
            <p className="font-semibold text-md text-black dark:text-white ml-2">
                {name}
            </p>
            <div className="ml-auto flex items-center">
                {type === "conversation" && (
                    <ChatVideoWrapper/>
                )}
                <SocketIndicator/>
            </div>
        </div>
    )
}