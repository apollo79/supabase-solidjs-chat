import { useNavigate } from '@solidjs/router';
import { Component, mergeProps } from 'solid-js';
import { useAuth } from '~/lib/auth';
import { ExtendPropsWithChildren } from '~/types';

type ProtectedProps = ExtendPropsWithChildren<{
    redirectTo?: string;
}>;

const defaultProps: Omit<ProtectedProps, 'children'> = {
    redirectTo: '/',
};

export const Protected: Component<ProtectedProps> = (props) => {
    const { children, redirectTo } = mergeProps(defaultProps, props);

    const navigate = useNavigate();

    const [{ initiating, session }] = useAuth();

    initiating.then(() => {
        console.info('checking session...');

        console.log(session());

        if (!session()) {
            console.warn('No session found, redirecting to signin');

            navigate(redirectTo, {
                replace: true,
            });
        }
    });

    return children;
};
