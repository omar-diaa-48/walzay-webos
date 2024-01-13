import { FormProvider, useForm } from "react-hook-form";
import AuthContainer from "../components/containers/AuthContainer";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignInForm } from "../utilities/interfaces/auth.interface";
import signInSchema from "../utilities/schemas/sign-in";
import TextFieldInput from "../components/handlers/TextFieldInput";
import Button from "../components/handlers/Button";
import { buildFetchRequest } from "../utilities/helpers";

const SignIn = () => {

    const methods = useForm<ISignInForm>({
        mode: "onChange",
        criteriaMode: "all",
        shouldFocusError: true,
        reValidateMode: "onChange",
        resolver: yupResolver(signInSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const { handleSubmit, formState } = methods;

    const handleUserSubmit = (form: ISignInForm) => {

        console.log({ form });

        buildFetchRequest<IUser>('POST', 'generateToken', form, false)
            .then((data) => {
                console.log(data);
            })

    }

    return (
        <AuthContainer title="Sign in to your account">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <FormProvider {...methods} >
                    <form className="space-y-6" onSubmit={handleSubmit(handleUserSubmit)}>
                        <TextFieldInput name="username" label="Username" />
                        <TextFieldInput name="password" label="Password" type="password" />
                        <div>
                            <Button disabled={!formState.isValid} type="submit">Sign In</Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </AuthContainer>
    )
}

export default SignIn;