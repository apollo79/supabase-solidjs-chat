import { Component, createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Chat, PropsWithChildren, User } from '~/types';

type MessengerStore = {
    users: User[];
    chats: Chat[];
    activeChat: number;
};

const MessengerContext = createContext<MessengerStore>();

export const MessengerProvider: Component<PropsWithChildren> = (props) => {
    const [state, setState] = createStore<MessengerStore>({
        users: [],
        chats: [],
        activeChat: 0,
    });

    return <MessengerContext.Provider value={state}>{props.children}</MessengerContext.Provider>;
};

export const useMessenger = (): MessengerStore => {
    const context = useContext(MessengerContext);

    if (context === undefined) {
        throw new Error('useMessenger must be used within a AuthProvider');
    }

    return context;
};
