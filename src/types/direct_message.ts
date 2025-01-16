
export type DirectMessage = {
    id: string;
    content: string;
    fileUrl: string | null;
    memberId: string;
    conversationId: string;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}