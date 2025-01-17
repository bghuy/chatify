
import { redirect } from "next/navigation"
import { NavigationAction } from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { NavigationItem } from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "../user-button";
import { getUserProfile } from "@/services/auth";
import { getAllServers } from "@/services/server";
export const NavigationSidebar = async() =>{
    const res = await getUserProfile();
    const userProfile = res?.profile;
    if (!userProfile) {
        redirect(`/`);
    }

    const serverRes = await getAllServers();
    const servers = serverRes?.servers;
    if(!servers){
        redirect("/")
    }
    return(
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
            <NavigationAction/>
            <Separator
                className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-sm w-10 mx-auto"
            />
            <ScrollArea className="flex-1 w-full">
                {servers?.map((server: { id: string; name: string; image: string }) => (
                    <div key={server.id} className="my-2">
                        <NavigationItem
                            id={server.id}
                            name={server.name}
                            imageUrl={server.image}
                        />
                    </div>
                ))}
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle/>
                <UserButton user={userProfile}/>
            </div>

        </div>
    )
}