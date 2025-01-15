import { InitialModal } from "@/components/modals/initial-modal";
import { getUserProfile } from "@/services/auth";
import { getFirstServerByUserId } from "@/services/server";
import { redirect } from "next/navigation";

const SetUpPage = async () => {
    const res = await getUserProfile();
    const userProfile = res?.profile;
    if (!userProfile) {
        redirect(`/auth/login`);
    }

    const serverRes = await getFirstServerByUserId(userProfile.id);
    const server = serverRes?.server;
    if (server) {
        redirect(`/servers/${server.id}`);
    }

    return <InitialModal />;
};

export default SetUpPage;
