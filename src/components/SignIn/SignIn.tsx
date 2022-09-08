import { Component, createSignal, Show } from 'solid-js';
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Button,
    CircularProgress,
    CircularProgressIndicator,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    VStack,
} from '@hope-ui/solid';
import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import type { InferType } from 'yup';
import { object, string } from 'yup';
import { AuthError } from '@supabase/supabase-js';
import { useAuth } from '~/context/auth';
import { useI18nContext } from '~/i18n/i18n-solid';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const schema = object({
    email: string().email().required(),
    password: string().required().matches(PASSWORD_REGEX, 'Type in a valid password'),
});

export const SignIn: Component = () => {
    // for future use of hCaptcha
    // const [captchaToken, setCaptchaToken] = createSignal('');
    const [error, setError] = createSignal<AuthError | null>(null);

    const [{ isSigningIn }, { signIn }] = useAuth();

    const { LL } = useI18nContext();

    console.log(LL().auth.email());

    const handleSignIn = async (values: InferType<typeof schema>) => {
        const { email, password } = values;

        const { error } = await signIn(
            {
                email,
                password,
            },
            '/chat',
        );

        if (error) {
            setError(error);
        }
    };

    const { form, errors, isValid } = createForm<InferType<typeof schema>>({
        extend: validator({ schema }),
        onSubmit: handleSignIn,
    });

    return (
        <VStack spacing={'3em'}>
            <Heading
                level={1}
                size={'2xl'}
            >
                {LL().auth.signin.signin()}
            </Heading>
            <Show when={!!error()}>
                <Alert
                    status="danger"
                    variant="left-accent"
                    flexDirection="column"
                    w={'$full'}
                >
                    <AlertIcon />
                    <AlertTitle>
                        {LL().error.base()}: {error()?.name}
                    </AlertTitle>
                    <AlertDescription>{error()?.message}</AlertDescription>
                </Alert>
            </Show>
            <Show when={isSigningIn()}>
                <Alert
                    status="info"
                    variant="left-accent"
                    w={'$full'}
                >
                    <AlertDescription mr={'$2_5'}>
                        <CircularProgress
                            indeterminate
                            size={'$6'}
                        >
                            <CircularProgressIndicator withRoundCaps />
                        </CircularProgress>
                    </AlertDescription>
                    {/* <AlertIcon mr={'$2_5'} /> */}
                    <AlertTitle mr={'$2_5'}>{LL().auth.signin.singingin()}</AlertTitle>
                </Alert>
            </Show>
            <VStack
                as="form"
                ref={form}
                spacing={'$3'}
            >
                <FormControl
                    required
                    invalid={!!errors('email')}
                >
                    <FormLabel>{LL().auth.email()}</FormLabel>
                    <Input
                        type="email"
                        placeholder="max@mustermann.de"
                        name="email"
                    ></Input>
                    <FormErrorMessage>{errors('email')[0]}</FormErrorMessage>
                </FormControl>
                <FormControl invalid={!!errors('password')}>
                    <FormLabel>{LL().auth.password()}</FormLabel>
                    <Input
                        type="password"
                        name="password"
                    ></Input>
                    <FormErrorMessage>{errors('password')[0]}</FormErrorMessage>
                </FormControl>
                <Button
                    type="submit"
                    disabled={!isValid()}
                    w={'$full'}
                >
                    {LL().auth.signin.signin()}
                </Button>
            </VStack>
        </VStack>
    );
};

export default SignIn;
