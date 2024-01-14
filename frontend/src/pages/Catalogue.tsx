import { ICatalogue } from '../utilities/interfaces/catalogue.interface'
import { buildFetchRequest } from '../utilities/helpers'
import { useQuery } from '@tanstack/react-query'
import PageContainer from '../components/containers/PageContainer'
import CatalogueCard from '../components/pages/catalogue/CatalogueCard'
import { useAppDispatch } from '../store/hooks'
import { addItemAction } from '../store/slices/cart'
import { useNavigate } from 'react-router-dom'

const Catalogue = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { data, isLoading, error } = useQuery<{ items: Array<ICatalogue> }>({
        queryFn: () => buildFetchRequest<{ items: Array<ICatalogue> }>('GET', 'items'),
        queryKey: ['catalogue']
    });

    const handleAddItemToCart = (item: ICatalogue) => {
        dispatch(addItemAction(item))
        navigate('/checkout')
    }

    return (
        <PageContainer isLoading={isLoading} error={error} title='Catalogue'>
            <div className="my-6 mx-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {data?.items?.map((item) => (
                    <CatalogueCard key={item.id} item={item} handleClicked={handleAddItemToCart} />
                ))}
            </div>
        </PageContainer>
    )
}

export default Catalogue