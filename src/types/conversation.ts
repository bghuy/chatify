
export type Conversation = {
    id: string;
    content: string;
    fileUrl: string | null;
    memberId: string;
    channelId: string;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}