import { JSXElement } from 'solid-js';

type PropsWithChildren = { children: JSXElement };

type ExtendPropsWithChildren<T extends Record<string, unknown> = Record<never, never>> = T & PropsWithChildren;

type Status = 'online' | 'offline' | 'working';

type UserId = string;

type User = {
    id: UserId;
    name: string;
    status: Status;
};

type MessageId = number;

type Message = {
    id: MessageId;
    content: string;
    createdAt: Date;
    edited: boolean;
    user: UserId;
};

type DmMessage = Message & {
    read: boolean;
};

type ChatId = number;

type ChatType = 'dm' | 'group';

type Chat = {
    id: ChatId;
    type: ChatType;
    messages: Message[] | DmMessage[];
    countUnread: number;
    name?: string;
    users?: UserId[];
    user?: UserId;
};

export type {
    ExtendPropsWithChildren,
    PropsWithChildren,
    Status,
    Epoch,
    UserId,
    User,
    MessageId,
    Message,
    DmMessage,
    ChatId,
    ChatType,
    Chat,
};
