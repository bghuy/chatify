import { User } from "@auth/core/types"
import {Server} from "./server"
export enum ChannelType {
    TEXT,
    AUDIO,
    VIDEO
  }
export type Channel = {
  id: string;
  name: string;
  type: ChannelType;
  user: User;
  server: Server;
  createdAt: Date;
  updatedAt: Date;

}