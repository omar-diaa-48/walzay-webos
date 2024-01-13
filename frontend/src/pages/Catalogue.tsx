import { ICatalogue } from '../utilities/interfaces/catalogue.interface'
import { formatRequestDate, hashRequestHeader } from '../utilities/helpers'
import { useQuery } from '@tanstack/react-query'
import PageContainer from '../components/containers/PageContainer'
import Loader from '../components/layout/Loader'
import Error from '../components/layout/Error'
import Button from '../components/handlers/Button'
import CatalogueCard from '../components/pages/catalogue/CatalogueCard'

const Catalogue = () => {

    const { data, isLoading, error } = useQuery<Array<ICatalogue>>({
        queryFn: () => {
            const path = 'items'
            const date = formatRequestDate()
            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNdW5lcm8iLCJleHAiOjE3MDUxODI5NDMsInR5cGUiOiJBdXRob3JpemF0aW9uVG9rZW4iLCJjcmVhdGlvbkRhdGUiOjE3MDUwOTY1NDMsInVzZXJJZCI6MTEzLCJ2ZXJzaW9uIjoxfQ.0fsBbbFFlxeiqYVrEo2zrvOUuLZ7AR5fDu2RDfVzC6U'

            const signature = path + 'GET' + date + token;
            const secret = 'coding_challenge_1'

            const signatureHeader = hashRequestHeader(signature, secret)

            return fetch(`https://staging.giftlov.com/api/Base/${path}`, {
                headers: {
                    'X-GIFTLOV-DATE': date,
                    'Accept': 'application/json',
                    'signature': signatureHeader,
                    'Authorization': token
                }
            })
                .then((res) => res.json())
                .then((data) => data.items)
        },
        queryKey: ['catalogue'],
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
                {data?.map((item) => (
                    <CatalogueCard key={item.id} item={item} />
                ))}
            </div>
        </PageContainer>
    )
}

export default Catalogue