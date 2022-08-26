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
import { object, string, ref } from 'yup';
import { AuthError } from '@supabase/supabase-js';
import { useAuth } from '~/lib/auth';
import { useI18nContext } from '~/i18n/i18n-solid';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const schema = object({
    email: string().email().required(),
    nickname: string().required().min(3),
    password: string().required().matches(PASSWORD_REGEX, 'Choose a strong password'),
    passwordConfirmation: string().oneOf([ref('password')], 'Passwords do not match'),
});

export const SignUp: Component = () => {
    // for future use of hCaptcha
    // const [captchaToken, setCaptchaToken] = createSignal('');
    const [error, setError] = createSignal<AuthError | null>(null);
    const [success, setSuccess] = createSignal(false);

    const [{ isSigningUp }, { signUp }] = useAuth();

    const { LL } = useI18nContext();

    const handleSignUp = async (values: InferType<typeof schema>) => {
        const { email, password, nickname } = values;

        const { error } = await signUp({
            email,
            password,
            options: {
                data: {
                    nickname,
                },
            },
        });

        if (error) {
            setError(error);
        } else {
            setSuccess(true);
        }
    };

    const { form, errors, isValid } = createForm<InferType<typeof schema>>({
        extend: validator({ schema }),
        onSubmit: handleSignUp,
    });

    return (
        <>
            <VStack spacing={'3em'}>
                <Heading
                    level={1}
                    size={'2xl'}
                >
                    {LL().auth.signup.signup()}
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
                            {LL().error.base()} {error()?.name}
                        </AlertTitle>
                        <AlertDescription>{error()?.message}</AlertDescription>
                    </Alert>
                </Show>
                <Show when={isSigningUp()}>
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
                        <AlertTitle mr={'$2_5'}>{LL().auth.signup.signingup()}</AlertTitle>
                    </Alert>
                </Show>
                <Show when={success()}>
                    <Alert
                        status="success"
                        variant="left-accent"
                        flexDirection="column"
                        w={'$full'}
                    >
                        <AlertIcon />
                        <AlertTitle>{LL().auth.signup.success()}</AlertTitle>
                        <AlertDescription>{LL().auth.signup.checkemail()}</AlertDescription>
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
                    <FormControl
                        required
                        invalid={!!errors('nickname')}
                    >
                        <FormLabel>{LL().auth.nickname()}</FormLabel>
                        <Input
                            type="text"
                            name="nickname"
                        ></Input>
                        <FormErrorMessage>{errors('nickname')[0]}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                        required
                        invalid={!!errors('password')}
                    >
                        <FormLabel>{LL().auth.password()}</FormLabel>
                        <Input
                            type="password"
                            name="password"
                        ></Input>
                        <FormErrorMessage>{errors('password')[0]}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                        required
                        invalid={!!errors('passwordConfirmation')}
                    >
                        <FormLabel>{LL().auth.confirmpassword()}</FormLabel>
                        <Input
                            type="password"
                            name="passwordConfirmation"
                        ></Input>
                        <FormErrorMessage>{errors('passwordConfirmation')[0]}</FormErrorMessage>
                    </FormControl>
                    <Button
                        type="submit"
                        disabled={!isValid()}
                        w={'$full'}
                    >
                        {LL().auth.signup.signup()}
                    </Button>
                </VStack>
            </VStack>
        </>
    );
};

export default SignUp;
