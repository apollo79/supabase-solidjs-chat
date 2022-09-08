import { Component, createEffect, createSignal, Show } from 'solid-js';

import { HopeProvider, HopeThemeConfig, NotificationsProvider } from '@hope-ui/solid';

import { localStorageDetector, navigatorDetector } from 'typesafe-i18n/detectors';

import TypesafeI18n from '~/i18n/i18n-solid';
import { Locales } from '~/i18n/i18n-types';
import { detectLocale } from '~/i18n/i18n-util';
import { loadLocaleAsync } from '~/i18n/i18n-util.async';

import { AuthProvider } from '~/context/auth';
import { MessengerProvider } from '~/context/messenger';

import { MyRoutes } from '~/Routes';

const config: HopeThemeConfig = {
    initialColorMode: 'system',
};

const detectedLocale: Locales = detectLocale(localStorageDetector, navigatorDetector);

const App: Component = () => {
    const [wasLoaded, setWasLoaded] = createSignal(false);

    createEffect(() => {
        loadLocaleAsync(detectedLocale).then(() => setWasLoaded(true));
    });

    return (
        <Show when={wasLoaded()}>
            <TypesafeI18n locale={detectedLocale}>
                <AuthProvider>
                    <MessengerProvider>
                        <HopeProvider config={config}>
                            <NotificationsProvider>
                                <MyRoutes />
                            </NotificationsProvider>
                        </HopeProvider>
                    </MessengerProvider>
                </AuthProvider>
            </TypesafeI18n>
        </Show>
    );
};

export default App;
