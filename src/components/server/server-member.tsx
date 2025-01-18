"use client"

import { cn } from "@/lib/utils";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { UserAvatar } from "../user-avatar";
import { Member, MemberRole } from "@/types/member";
import { User } from "@/types/user";
import { Server } from "@/types/server";

interface ServerMemberProps {
    member: Member & {user: User};
    server: Server;
}
const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 text-indigo-500"/>,
    [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 text-rose-500"/>
}
export const ServerMember = ({
    member,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    server
}: ServerMemberProps) =>{
    const params = useParams();
    const router = useRouter();
    const icon = roleIconMap[member.role];
    
    const handleClick = () =>{
        router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
    }
   return(
        <button
            onClick={()=>{handleClick()}}
            className={cn(
                "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
                params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
            )}
        >
            {
                member?.user?.image 
                ?
                <UserAvatar 
                    src={member.user.image as string}
                    className="h-8 w-8 md:h-8 md:w-8"
                />
                :
                <div
                    className={cn(
                        "relative flex h-[32px] w-[32px] rounded-full overflow-hidden"
                    )}
                >
                    <div className="h-full w-full flex items-center justify-center bg-slate-50 text-black">
                        {member?.user?.email?.charAt(0).toUpperCase()}
                    </div>
                </div>
            }

            <p
                className={cn(
                    "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
                    params?.memberId === member.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"

                )}
            >
                {member?.user?.name || member.user?.email}
            </p>
            {icon}
        </button>
   ) 
}