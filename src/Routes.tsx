import { Component, lazy } from 'solid-js';
import { Route, Routes } from '@solidjs/router';

import { Protected } from '~/components/Protected';

const Auth = lazy(() => import('~/pages/Auth'));
const Chat = lazy(() => import('~/pages/Chat'));

export const MyRoutes: Component = () => {
    return (
        <Routes>
            <Route
                path={['/signin', '/signup']}
                component={Auth}
            />
            <Protected redirectTo="/signin">
                <Route
                    path="/chat"
                    component={Chat}
                />
            </Protected>
        </Routes>
    );
};
