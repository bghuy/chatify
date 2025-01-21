
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { ServerSearch } from "./server-search";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";
import { signOutUser } from "@/actions/auth/signOut";
import { getUserProfile } from "@/services/auth";
import { getServerByServerId } from "@/services/server";
import { ServerWithMembersWithUsersWithChannel } from "@/types/user";
import { ChannelType } from "@/types/channel";
import { MemberRole } from "@/types/member";

interface ServerSidebarProps {
    serverId: string
}

const iconMap = {
    [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4"/>,
    [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4"/>,
    [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4"/>,
}

const roleIconMap = {
    [MemberRole.GUEST] : null,
    [MemberRole.ADMIN]: <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500"/>,
    [MemberRole.MODERATOR]: <ShieldAlert className="mr-2 h-4 w-4 text-rose-500"/>,
}

export const ServerSidebar = async({serverId}: ServerSidebarProps) =>{
    
    const res = await getUserProfile();
    const user = res?.profile;
    if (!user) {
        await signOutUser();
        redirect("/auth/login");
    }
    const serverRes = await getServerByServerId(serverId);
    const server = serverRes?.server as ServerWithMembersWithUsersWithChannel;
    

    const textChannels = server?.channels.filter((channel)=> channel.type === ChannelType.TEXT)
    const audioChannels = server?.channels.filter((channel)=> channel.type === ChannelType.AUDIO)
    const videoChannels = server?.channels.filter((channel)=> channel.type === ChannelType.VIDEO)
    const members = server?.members.filter((member)=> member.userId !== user.id)
    
    
    if(!server) return redirect("/")

    const role = server.members.find((member)=> member.userId === user.id)?.role;

    return(
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <ServerHeader
                server = {server}
                role = {role}
            />
            <ScrollArea className="flex-1 px-3">
                <div className="mt-2">
                    <ServerSearch data={[
                        {
                            label: "Text Channels",
                            type: "channel",
                            data: textChannels?.map((channel)=>({
                                id:channel.id,
                                name: channel.name,
                                icon: iconMap[channel.type]
                            }))
                        },
                        {
                            label: "Voice Channels",
                            type: "channel",
                            data: audioChannels?.map((channel)=>({
                                id:channel.id,
                                name: channel.name,
                                icon: iconMap[channel.type]
                            }))
                        },
                        {
                            label: "Video Channels",
                            type: "channel",
                            data: videoChannels?.map((channel)=>({
                                id:channel.id,
                                name: channel.name,
                                icon: iconMap[channel.type]
                            }))
                        },
                        {
                            label: "Members",
                            type: "member",
                            data: members?.map((member)=>({
                                id:member.id,
                                name: member.user.name ?? "",
                                icon: roleIconMap[member.role]
                            }))
                        },
                    ]}/>
                </div>
                <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"/>
                {!!textChannels?.length && (
                    <div className="mb-2">
                        <ServerSection
                            sectionType="channels"
                            channelType={ChannelType.TEXT}
                            role={role}
                            label="Text Channel"
                        />
                        <div className="space-y-[2px]">
                            {textChannels.map((channel)=>(
                                <ServerChannel
                                    key={channel.id}
                                    channel={channel}
                                    role={role}
                                    server = {server}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {!!audioChannels?.length && (
                    <div className="mb-2">
                        <ServerSection
                            sectionType="channels"
                            channelType={ChannelType.AUDIO}
                            role={role}
                            label="Voice Channel"
                        />
                        <div className="space-y-[2px]">
                            {audioChannels.map((channel)=>(
                                <ServerChannel
                                    key={channel.id}
                                    channel={channel}
                                    role={role}
                                    server = {server}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {!!videoChannels?.length && (
                    <div className="mb-2">
                        <ServerSection
                            sectionType="channels"
                            channelType={ChannelType.VIDEO}
                            role={role}
                            label="Video Channel"
                        />
                        <div className="space-y-[2px]">
                            {videoChannels.map((channel)=>(
                                <ServerChannel
                                    key={channel.id}
                                    channel={channel}
                                    role={role}
                                    server = {server}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {!!members?.length && (
                    <div className="mb-2">
                        <ServerSection
                            sectionType="members"
                            role={role}
                            label="Members"
                            server = {server}
                        />
                        <div className="space-y-[2px]">
                            {members.map((member)=>(
                                <ServerMember
                                    key={member.id}
                                    member={member}
                                    server={server}
                                />
                            ))}
                        </div>
                    </div>
                )}    
            </ScrollArea>

        </div>
    )
}