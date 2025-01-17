export type Server = {
    id: string;
    name: string;
    image: string;
    inviteCode: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateServerType = {
    name: string;
    image: string;
}

