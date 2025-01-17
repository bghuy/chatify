
// export enum ChannelType {
//   TEXT,
//   AUDIO,
//   VIDEO
// }

export const ChannelType = {
  TEXT: 'TEXT',
  AUDIO: 'AUDIO',
  VIDEO: 'VIDEO'
};

export type ChannelType = (typeof ChannelType)[keyof typeof ChannelType]


export type Channel = {
  id: string;
  name: string;
  type: ChannelType;
  userId: string;
  serverId: string;
  createdAt: Date;
  updatedAt: Date;
}