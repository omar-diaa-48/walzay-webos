import { FormProvider, useForm } from "react-hook-form";
import AuthContainer from "../components/containers/AuthContainer";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignInForm } from "../utilities/interfaces/auth.interface";
import signInSchema from "../utilities/schemas/sign-in";
import TextFieldInput from "../components/handlers/TextFieldInput";
import Button from "../components/handlers/Button";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { signInAsyncAction } from "../store/slices/user";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { useEffect } from "react";
import PageContainer from "../components/containers/PageContainer";
import Loader from "../components/layout/Loader";

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { isAuthenticated, isLoading } = useAppSelector((state: RootState) => state.user)

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
        dispatch(signInAsyncAction(form))
            .then((data) => {
                if (data.meta.requestStatus === 'fulfilled') {
                    navigate('/')
                }
            })
    }

    useEffect(() => {
        if (isAuthenticated) {
            setTimeout(() => {
                navigate('/')
            }, 1000);
        }
    }, [isAuthenticated])

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <PageContainer title="">
            <AuthContainer title="Sign in to your account">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <FormProvider {...methods} >
                        <form className="space-y-6" onSubmit={handleSubmit(handleUserSubmit)}>
                            <TextFieldInput name="username" label="Username" variant="outlined" />
                            <TextFieldInput name="password" label="Password" type="password" variant="outlined" />
                            <div>
                                <Button disabled={!formState.isValid || isAuthenticated} type="submit">Sign In</Button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </AuthContainer>
        </PageContainer>
    )
}

export default SignIn;