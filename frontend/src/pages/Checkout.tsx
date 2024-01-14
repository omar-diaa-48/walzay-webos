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
import { buildFetchRequest } from "../utilities/helpers"
import DropDown from "../components/handlers/DropDown"

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
            customerName: "",
            deliveryChannel: 'api'
        }
    })

    const { getValues } = methods;

    const handlePlaceOrder = () => {
        const data = getValues();

        const referenceNo = Date.now();

        const payload = {
            ...data,
            referenceNo,
            lineItems: [
                { cartItemId: item?.id, value: 50 }
            ]
        }

        const params = [data.customerName, data.firstName, data.lastName, 'api', referenceNo, item?.id, 50].sort().join('')

        buildFetchRequest<{ id: string, referenceNo: string }>('POST', 'placeOrder', payload, params)
            .then((data) => {
                console.log({ data });
            })
    }

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
                    <DropDown name="deliveryChannel" label="Delivery Channel" options={['api', 'email', 'sms']} />
                </FormProvider>
            </div>

            <div className="flex justify-center my-4">
                <CatalogueCard item={item} handleClicked={handlePlaceOrder} />
            </div>
        </PageContainer>
    )
}

export default Checkout