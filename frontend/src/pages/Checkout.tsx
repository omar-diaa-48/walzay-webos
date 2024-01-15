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
import { toast } from "react-toastify"
import { IPlaceOrderResponse } from "../utilities/interfaces/place-order-res.interface"
import { useState } from "react"
import QRCode from "react-qr-code"

const Checkout = () => {
    const { item } = useAppSelector((state: RootState) => state.cart)

    const [claimUrl, setClaimUrl] = useState<string>("");

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
            emailAddress: "",
            smsMobileNumber: "",
            deliveryChannel: 'api',
        }
    })

    const { getValues, formState, trigger, clearErrors } = methods;

    const handlePlaceOrder = () => {
        if (!formState.isValid) {
            trigger()
                .then(() => {
                    toast.error('Error, Some of the input data is not valid!')
                })

            return;
        }

        clearErrors()

        const data = getValues();
        const referenceNo = Date.now();
        const value = 50;

        const payload = {
            ...data,
            referenceNo,
            lineItems: [
                { cartItemId: item?.id, value }
            ]
        }

        const params = [data.customerName, data.firstName, data.lastName, data.emailAddress, data.smsMobileNumber, 'api', referenceNo, item?.id, value].sort().join('')

        buildFetchRequest<IPlaceOrderResponse>('POST', 'placeOrder', payload, params)
            .then((data) => {
                console.log({ data });

                setClaimUrl(data.claimURL)
            })
            .catch((error): any => {
                toast.error(error.message)
            })
    }

    if (!item) {
        return (
            <Error message="No item in the cart!" />
        )
    }

    return (
        <PageContainer title="Checkout">
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mx-8'>
                {
                    claimUrl ? (
                        <QRCode value={claimUrl} />
                    ) : (

                        <FormProvider {...methods} >
                            <TextFieldInput name="customerName" label="Customer name" variant="outlined" />
                            <TextFieldInput name="firstName" label="First name" variant="outlined" />
                            <TextFieldInput name="lastName" label="Last name" variant="outlined" />
                            <DropDown name="deliveryChannel" label="Delivery Channel" options={['api', 'email', 'sms']} />
                            <TextFieldInput name="emailAddress" label="Email Address" variant="outlined" />
                            <TextFieldInput name="smsMobileNumber" label="Sms Mobile Number" variant="outlined" />
                        </FormProvider>
                    )
                }
            </div>

            <div className="flex justify-center my-4">
                <CatalogueCard item={item} handleClicked={handlePlaceOrder} />
            </div>
        </PageContainer>
    )
}

export default Checkout