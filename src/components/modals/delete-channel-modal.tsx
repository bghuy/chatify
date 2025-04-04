'use client'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"

import { useModal } from "../../../hooks/use-modal-store"
import { Button } from "../ui/button";
import { useState } from "react";
import {useRouter } from "next/navigation";
import { deleteChannel } from "@/services/channel";

export const DeleteChannelModal = () =>{
    const {isOpen, onClose , type, data} = useModal();
    const router = useRouter();
    const isModalOpen = isOpen === true && type === "DeleteChannel";
    const {server, channel} = data;
    const [isLoading, setIsLoading] = useState(false);
    const handleClick = async () => {
        try {
            setIsLoading(true);
            if (server?.id && channel?.id) {
                await deleteChannel(server.id, channel.id);
                router.refresh();
                onClose();
                // router.push(`/servers/${server.id}`)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    return( 
        <Dialog open = {isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Channel
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to do this <span className="font-semibold text-indigo-500">#{channel?.name}</span>  will be permanently deleted.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button
                            disabled={isLoading}
                            onClick={()=>{onClose()}}
                            variant="ghost"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            onClick={()=>{handleClick()}}
                            variant="primary"
                        >
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}