import { FormProvider, useForm } from "react-hook-form"
import PageContainer from "../components/containers/PageContainer"
import TextFieldInput from "../components/handlers/TextFieldInput"
import Error from "../components/layout/Error"
import CatalogueCard from "../components/pages/catalogue/CatalogueCard"
import { RootState } from "../store"
import { useAppSelector } from "../store/hooks"
import { IPlaceOrder } from "../utilities/interfaces/place-order.interface"
import { yupResolver } from "@hookform/resolvers/yup"
import placeOrderSchema from "../utilities/schemas/place-order"

const Checkout = () => {
    const { item } = useAppSelector((state: RootState) => state.cart)

    const methods = useForm<IPlaceOrder>({
        mode: "onChange",
        criteriaMode: "all",
        shouldFocusError: true,
        reValidateMode: "onChange",
        resolver: yupResolver(placeOrderSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            customerName: ""
        }
    })

    if (!item) {
        return (
            <Error message="No item in the cart!" />
        )
    }

    return (
        <PageContainer title="Checkout">
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <FormProvider {...methods} >
                    <TextFieldInput name="customerName" label="Customer name" />
                    <TextFieldInput name="firstName" label="First name" />
                    <TextFieldInput name="lastName" label="Last name" />
                </FormProvider>
            </div>

            <div className="flex justify-center my-4">
                <CatalogueCard item={item} />
            </div>
        </PageContainer>
    )
}

export default Checkout