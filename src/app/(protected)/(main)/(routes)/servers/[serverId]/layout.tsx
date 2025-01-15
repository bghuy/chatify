// import { currentUser } from "@/lib/current-user";
// import { signOut } from "@/auth";
// import { db } from "@/lib/db";
import { signOut } from "@/actions/auth/signOut";
import { ServerSidebar } from "@/components/server/server-sidebar";
import { getUserProfile } from "@/services/auth";
import { getFirstServerByUserId } from "@/services/server";
import { redirect } from "next/navigation";
const ServerIdLayout = async({
    children,
    params
}: {
    children: React.ReactNode,
    params: {
        serverId: string
    }
}) =>{
    const res = await getUserProfile();
    const userProfile = res?.profile;
    if (!userProfile) {
        await signOut();
        redirect("/auth/login");
    }
    const server = await getFirstServerByUserId()
    if(!server){
        return redirect("/")
    }
    return(
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col inset-y-0 fixed">
                <ServerSidebar serverId = {params.serverId}/>
            </div>
            <main className="h-full pl-0 md:pl-60">
                {children}
            </main>
        </div>
    )
}

export default ServerIdLayout;