import {
    Component,
    createEffect,
    createContext,
    useContext,
    createSignal,
    Accessor,
    onMount,
    onCleanup,
    batch,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { useNavigate } from '@solidjs/router';
import {
    User,
    Subscription,
    SignUpWithPasswordCredentials,
    SignInWithPasswordCredentials,
    AuthResponse,
    Session,
} from '@supabase/supabase-js';
import { auth } from '~/lib/supabase';
import { PropsWithChildren } from '~/types';
import { supabase } from '~/lib/supabase';

type AuthStore = [
    {
        initiating: Promise<void>;
        authenticated: Accessor<boolean>;
        user: Accessor<User>;
        session: Accessor<Session>;
        isSigningIn: Accessor<boolean>;
        isSigningUp: Accessor<boolean>;
    },
    {
        signOut?: (redirectTo?: string) => void;
        signIn?: (credentials: SignInWithPasswordCredentials, redirectTo?: string) => Promise<AuthResponse>;
        signUp?: (credentials: SignUpWithPasswordCredentials, redirectTo?: string) => Promise<AuthResponse>;
    },
];

const AuthContext = createContext<AuthStore>([
    {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        initiating: new Promise(() => {}),
        authenticated: () => false,
        user: () => null,
        session: () => null,
        isSigningIn: () => false,
        isSigningUp: () => false,
    },
    {},
]);

export const AuthProvider: Component<PropsWithChildren> = (props) => {
    const [isSigningIn, setIsSigningIn] = createSignal(false);
    const [isSigningUp, setIsSigningUp] = createSignal(false);
    const [authenticated, setAuthenticated] = createSignal(false);
    const [user, setUser] = createSignal<User>(null);
    const [session, setSession] = createSignal<Session>(null);

    let resolveInitiation: () => void;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const initiating = new Promise<void>((resolve) => {
        resolveInitiation = resolve;
    });

    const [state, setState] = createStore({
        initiating,
        authenticated,
        user,
        session,
        isSigningIn,
        isSigningUp,
    });

    const navigate = useNavigate();

    const store: AuthStore = [
        state,
        {
            async signOut(redirectTo?: string): Promise<void> {
                await auth.signOut();

                setAuthenticated(false);

                redirectTo && navigate(redirectTo);
            },
            signIn(credentials: SignInWithPasswordCredentials, redirectTo?: string): Promise<AuthResponse> {
                setIsSigningIn(true);

                return new Promise((resolve, reject) => {
                    supabase.auth
                        .signInWithPassword(credentials)
                        .then((authres) => {
                            redirectTo && navigate(redirectTo);

                            const { error } = authres;

                            if (error) {
                                reject(error);
                            } else {
                                resolve(authres);
                            }
                        })
                        .catch((error) => {
                            reject(error);
                        })
                        .finally(() => {
                            setIsSigningIn(false);
                        });
                });
            },
            signUp(credentials: SignUpWithPasswordCredentials, redirectTo?: string): Promise<AuthResponse> {
                setIsSigningUp(true);

                return new Promise((resolve, reject) => {
                    supabase.auth
                        .signUp(credentials)
                        .then((authres) => {
                            redirectTo && navigate(redirectTo);

                            const { error } = authres;

                            if (error) {
                                reject(error);
                            } else {
                                resolve(authres);
                            }
                        })
                        .catch((error) => {
                            reject(error);
                        })
                        .finally(() => {
                            setIsSigningUp(false);
                        });
                });
            },
        },
    ];

    let authStateSubscription: { subscription: Subscription } = null;

    createEffect(() => {
        !state.user && setAuthenticated(false);
    });

    onMount(async () => {
        authStateSubscription = auth.onAuthStateChange(async (event, session) => {
            if (event == 'SIGNED_IN') {
                batch(() => {
                    setAuthenticated(true);
                });
            }

            if (event == 'SIGNED_OUT' || event == 'USER_DELETED') {
                batch(() => {
                    setAuthenticated(false);
                });
            }

            const user = session.user ?? null;

            setSession(session);

            setUser(user);
        });

        auth.getSession().then((res) => {
            setSession(res.data.session);

            setUser(res.data.session?.user || null);

            if (state.session()) {
                setAuthenticated(true);
            }

            resolveInitiation();
        });
    });

    onCleanup(() => {
        authStateSubscription.subscription.unsubscribe();
    });

    return <AuthContext.Provider value={store}>{props.children}</AuthContext.Provider>;
};

export const useAuth = (): AuthStore => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }

    return context;
};
