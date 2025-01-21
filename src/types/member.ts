
export const MemberRole = {
    ADMIN: 'ADMIN',
    MODERATOR: 'MODERATOR',
    GUEST: 'GUEST',
};

export type MemberRole = (typeof MemberRole)[keyof typeof MemberRole]

export type Member = {
    id: string;
    role: MemberRole;
    userId: string;
    serverId: string;
    createdAt: Date;
    updatedAt: Date;
}