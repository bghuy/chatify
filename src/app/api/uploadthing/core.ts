import { auth } from "@/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";


const f = createUploadthing();

const handleAuth = async() =>{
    const session = await auth();
    const user = session?.user;
    const userId = user?.id;
    if(!userId) throw new Error("Unauthorized")
    return {userId: userId};
}

export const ourFileRouter = {
    serverImage: f({image: {maxFileSize: "4MB"}})
        .middleware(async()=>await handleAuth())
        .onUploadComplete(()=>{}),
    
    // messageFile: f(["image","pdf"])
    //     .middleware(async()=>await handleAuth())
    //     .onUploadComplete(()=>{}),
    messageFile: f({image: {maxFileSize: "4MB"}})
        .middleware(async()=>await handleAuth())
        .onUploadComplete(()=>{})

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
