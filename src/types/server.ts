import { User } from "@auth/core/types"
import { Channel } from "./channel"

export type Server = {
    name: string
    image?: string
    inviteCode?: string
    user: User
    channels: Channel[]
}