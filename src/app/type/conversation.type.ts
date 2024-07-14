import { Role } from '../enum/role.enum';

export type MessagePart = {
  text: string;
};

export type Message = {
  role: Role;
  parts: MessagePart[];
};

export type Conversation = {
  _id?: string;
  messages: Message[];
  createdAt?: Date;
  updatedAt?: Date;
};
