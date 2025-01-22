
import { getServerByServerId } from "@/services/server"
import { redirect } from "next/navigation"

interface ServerIdPageProps {
    params: {
        serverId: string
    }
}
const ServerIdPage = async({
    params
}: ServerIdPageProps) => {
    const res = await getServerByServerId(params?.serverId, "general")
    const server = res?.server
    const initialChannel = server?.channels[0];
    if(initialChannel?.name !== "general") {
        return null;
    }
    return redirect(`/servers/${params.serverId}/channels/${initialChannel.id}`)
}
 
export default ServerIdPage;