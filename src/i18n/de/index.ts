import { BaseTranslation } from '../i18n-types';

const de: BaseTranslation = {
    // this is an example Translation, just rename or delete this folder if you want
    auth: {
        signin: {
            signin: 'Einloggen',
            singingin: 'Einloggen...',
        },
        signup: {
            signup: 'Registrieren',
            signingup: 'Registrieren',
            success: 'Du bist jetzt registriert!',
            checkemail: 'Wir haben dir eine Email zur Bestätigung deiner Identität geschickt',
        },
        password: 'Passwort:',
        confirmpassword: 'Passwort wiederholen:',
        email: 'Email:',
        nickname: 'Nickname:',
    },
    error: {
        base: 'Ein Fehler ist aufgetreten!',
    },
    HI: 'Hallo',
};

export default de;
