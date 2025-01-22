import { signOutUser } from "@/actions/auth/signOut";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { getUserProfile } from "@/services/auth";
import { getChannelByChannelId } from "@/services/channel";
import { getMemberOfCurrentUserInServer } from "@/services/server";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
    params: {
        serverId: string,
        channelId: string
    }
}

const ChannelIdPage = async({
    params
}: ChannelIdPageProps) => {
    const res = await getUserProfile();
    const user = res?.profile;
    if (!user) {
        await signOutUser();
        redirect("/auth/login");
    }
    
    const channelRes = await getChannelByChannelId(params.channelId);
    const channel = channelRes?.channel;
    
    const memberRes = await getMemberOfCurrentUserInServer(params?.serverId);
    const member = memberRes?.member;
    
    if(!channel || !member) return redirect("/")

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                name={channel.name}
                serverId={channel.serverId}
                type="channel"
            />
            {
                channel.type === ChannelType.TEXT && (
                    <>
                        <ChatMessages
                            member={member}
                            name={channel.name}
                            chatId={channel.id}
                            type="channel"
                            apiUrl="/messages"
                            socketUrl="/socket/messages"
                            socketQuery={{
                                channelId: channel.id,
                                serverId: channel.serverId
                            }}
                            paramKey="channelId"
                            paramValue={channel.id}
                        />
                        <ChatInput
                            name={channel.name}
                            type="channel"
                            apiUrl="/socket/messages"
                            query={{
                                channelId: channel.id,
                                serverId: channel.serverId
                            }}
                        />
                    </>
                )
            }
            {channel.type === ChannelType.AUDIO && (
                <MediaRoom
                    chatId={channel.id}
                    audio={true}
                    video={false}
                    user = {user}
                />
            )}
            {channel.type === ChannelType.VIDEO && (
                <MediaRoom
                    chatId={channel.id}
                    audio={true}
                    video={true}
                    user = {user}
                />
            )}
        </div>
    );
}
 
export default ChannelIdPage;