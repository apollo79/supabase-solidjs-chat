import { Component } from 'solid-js';
import { HopeProvider, HopeThemeConfig, NotificationsProvider } from '@hope-ui/solid';
import { MyRoutes } from '~/Routes';
import { AuthProvider } from './lib/auth';

const config: HopeThemeConfig = {
    initialColorMode: 'system',
};

const App: Component = () => {
    return (
        <AuthProvider>
            <HopeProvider config={config}>
                <NotificationsProvider>
                    <MyRoutes />
                </NotificationsProvider>
            </HopeProvider>
        </AuthProvider>
    );
};

export default App;
