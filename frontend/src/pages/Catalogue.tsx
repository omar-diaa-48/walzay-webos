import { ICatalogue } from '../utilities/interfaces/catalogue.interface'
import { buildFetchRequest, formatRequestDate, hashRequestHeader } from '../utilities/helpers'
import { useQuery } from '@tanstack/react-query'
import PageContainer from '../components/containers/PageContainer'
import Loader from '../components/layout/Loader'
import Error from '../components/layout/Error'
import CatalogueCard from '../components/pages/catalogue/CatalogueCard'

const Catalogue = () => {

    const { data, isLoading, error } = useQuery<{ items: Array<ICatalogue> }>({
        queryFn: () => buildFetchRequest<{ items: Array<ICatalogue> }>('GET', 'items'),
        queryKey: ['catalogue']
    });

    if (isLoading) {
        return (
            <Loader />
        )
    }

    if (error) {
        return (
            <Error />
        )
    }

    return (
        <PageContainer title='Catalogue'>
            <div className="my-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {data?.items?.map((item) => (
                    <CatalogueCard key={item.id} item={item} />
                ))}
            </div>
        </PageContainer>
    )
}

export default Catalogue