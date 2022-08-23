import { Tab, TabList, TabPanel, Tabs } from '@hope-ui/solid';
import { Component } from 'solid-js';
import { Link, useLocation } from '@solidjs/router';
import { SignIn } from '~/components/SignIn';
import { SignUp } from '~/components/SignUp';
import { CardLayout } from '~/layouts/Card';

export const Auth: Component = () => {
    const isSignUp = useLocation().pathname == '/signup';

    return (
        <CardLayout
            mt="$10"
            mx="auto"
            centerX
        >
            <Tabs
                fitted
                defaultIndex={isSignUp ? 1 : 0}
                variant="pills"
            >
                <TabList>
                    <Tab>
                        <Link href="/signin">Sign in</Link>
                    </Tab>
                    <Tab>
                        <Link href="/signup">Sign up</Link>
                    </Tab>
                </TabList>
                <TabPanel>
                    <SignIn />
                </TabPanel>
                <TabPanel>
                    <SignUp />
                </TabPanel>
            </Tabs>
        </CardLayout>
    );
};

export default Auth;
