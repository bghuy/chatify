import { Channel } from "./channel";
import { Member } from "./member";
import { Server } from "./server";

export type  UserRole = "ADMIN" | "USER"
export type UserServiceType = {
    id: string,
    name: string,
    email: string,
    emailVerified?: Date | string;
    image?: string | null,
    role: UserRole,
    createdAt?: Date | string,
    updatedAt?: Date | string
}

export type User = {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

export type ServerWithMembersWithUsers = Server & {
    members: (Member & {user: User})[];
}
export type ServerWithMembersWithUsersWithChannel = Server & {
    members: (Member & {user: User})[];
    channels: Channel[]
}