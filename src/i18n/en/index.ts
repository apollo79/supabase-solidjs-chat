import type { Translation } from '../i18n-types';

const en: Translation = {
    // TODO: your translations go here
    auth: {
        signin: {
            signin: 'Sign in',
            singingin: 'Signing in...',
        },
        signup: {
            signup: 'Sign up',
            signingup: 'Signing up...',
            success: 'Success!',
            checkemail: "We've sent you an email to confirm your identity",
        },
        password: 'Password:',
        confirmpassword: 'Confirm password:',
        email: 'Email:',
        nickname: 'Nickname:',
    },
    error: { base: 'An error occured!' },
    HI: 'Hello',
};

export default en;
