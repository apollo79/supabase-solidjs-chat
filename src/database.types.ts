export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
    public: {
        Tables: {
            participants: {
                Row: {
                    id: number;
                    user_id: string;
                    room_id: number;
                    inserted_at: string;
                    role: 'ADMIN' | 'MODERATOR' | 'NORMAL' | null;
                    lastmessageread: number | null;
                };
                Insert: {
                    id?: number;
                    user_id: string;
                    room_id: number;
                    inserted_at?: string;
                    role?: 'ADMIN' | 'MODERATOR' | 'NORMAL' | null;
                    lastmessageread?: number | null;
                };
                Update: {
                    id?: number;
                    user_id?: string;
                    room_id?: number;
                    inserted_at?: string;
                    role?: 'ADMIN' | 'MODERATOR' | 'NORMAL' | null;
                    lastmessageread?: number | null;
                };
            };
            role_permissions: {
                Row: {
                    id: number;
                    role: 'ADMIN' | 'MODERATOR' | 'NORMAL';
                    permission: 'rooms.update' | 'messages.delete' | 'users.invite' | 'users.kick' | 'users.changerole';
                };
                Insert: {
                    id?: number;
                    role: 'ADMIN' | 'MODERATOR' | 'NORMAL';
                    permission: 'rooms.update' | 'messages.delete' | 'users.invite' | 'users.kick' | 'users.changerole';
                };
                Update: {
                    id?: number;
                    role?: 'ADMIN' | 'MODERATOR' | 'NORMAL';
                    permission?:
                        | 'rooms.update'
                        | 'messages.delete'
                        | 'users.invite'
                        | 'users.kick'
                        | 'users.changerole';
                };
            };
            users: {
                Row: {
                    id: string;
                    nickname: string | null;
                    email: unknown;
                    status: 'ONLINE' | 'OFFLINE' | 'BUSY' | null;
                    last_seen: string;
                };
                Insert: {
                    id: string;
                    nickname?: string | null;
                    email: unknown;
                    status?: 'ONLINE' | 'OFFLINE' | 'BUSY' | null;
                    last_seen?: string;
                };
                Update: {
                    id?: string;
                    nickname?: string | null;
                    email?: unknown;
                    status?: 'ONLINE' | 'OFFLINE' | 'BUSY' | null;
                    last_seen?: string;
                };
            };
            rooms: {
                Row: {
                    id: number;
                    name: string | null;
                    public: boolean | null;
                    created_by: string | null;
                };
                Insert: {
                    id?: number;
                    name?: string | null;
                    public?: boolean | null;
                    created_by?: string | null;
                };
                Update: {
                    id?: number;
                    name?: string | null;
                    public?: boolean | null;
                    created_by?: string | null;
                };
            };
            messages: {
                Row: {
                    id: number;
                    message: string;
                    inserted_at: string;
                    updated_at: string;
                    user_id: string;
                    room_id: number;
                    deleted: boolean | null;
                    edited: boolean | null;
                };
                Insert: {
                    id?: number;
                    message: string;
                    inserted_at?: string;
                    updated_at?: string;
                    user_id: string;
                    room_id: number;
                    deleted?: boolean | null;
                    edited?: boolean | null;
                };
                Update: {
                    id?: number;
                    message?: string;
                    inserted_at?: string;
                    updated_at?: string;
                    user_id?: string;
                    room_id?: number;
                    deleted?: boolean | null;
                    edited?: boolean | null;
                };
            };
        };
        Functions: {
            is_in_room: {
                Args: { user_id: string; room_id: number };
                Returns: boolean;
            };
            authorize: {
                Args: {
                    requested_permission:
                        | 'rooms.update'
                        | 'messages.delete'
                        | 'users.invite'
                        | 'users.kick'
                        | 'users.changerole';
                    user_id: string;
                    room_id: number;
                };
                Returns: boolean;
            };
        };
    };
}
