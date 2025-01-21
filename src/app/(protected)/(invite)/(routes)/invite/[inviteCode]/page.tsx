import { signOutUser } from "@/actions/auth/signOut";
import { getUserProfile } from "@/services/auth";
import { joinServer } from "@/services/server";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
    params: {
        inviteCode: string
    }
}
const InviteCodePage = async({
    params
}:InviteCodePageProps) => {
    const res = await getUserProfile();
    const userProfile = res?.profile;
    if (!userProfile) {
        await signOutUser();
        redirect("/auth/login");
    }

    if(!params.inviteCode) return redirect("/")
    const resServer = await joinServer(params.inviteCode);
    if(!resServer) {
        return redirect(`/`);
    }
    console.log(resServer,"resServer");
    
    const server = resServer?.server;
    if(server) return redirect(`/servers/${server.id}`);
    return null
}
 
export default InviteCodePage;