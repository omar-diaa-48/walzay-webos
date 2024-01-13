import PageContainer from "../components/containers/PageContainer"
import Error from "../components/layout/Error"
import { RootState } from "../store"
import { useAppSelector } from "../store/hooks"

const Checkout = () => {
    const { item } = useAppSelector((state: RootState) => state.cart)

    if (!item) {
        return (
            <Error message="No item in the cart!" />
        )
    }

    return (
        <PageContainer title="Checkout">
            <div>
                <p>{item.brand}</p>
            </div>
        </PageContainer>
    )
}

export default Checkout