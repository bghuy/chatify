import { InitialModal } from "@/components/modals/initial-modal";

const SetUpPage = async() => {
    // const session = await auth()

    // const server = await db.server.findFirst({
    //     where:{
    //         members:{
    //             some: {
    //                 userId: session?.user.id
    //             }
    //         }
    //     }
    // })

    // if(server){
    //     return redirect(`/servers/${server.id}`)
    // }

    return (
        <InitialModal/>
    );
}
 
export default SetUpPage;