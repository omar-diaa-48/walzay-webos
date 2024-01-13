import { useQuery } from '@tanstack/react-query';
import PageContainer from '../components/containers/PageContainer'
import Profile from '../components/pages/main/Profile'
import { buildFetchRequest } from '../utilities/helpers';

const Main = () => {
    const { data, isLoading, error } = useQuery<Array<IWallet>>({
        queryFn: () => buildFetchRequest<Array<IWallet>>('GET', 'wallets/balances'),
        queryKey: ['wallets-balances']
    });

    return (
        <PageContainer isLoading={isLoading} error={error} title=''>
            {data && (
                <Profile wallets={data} />
            )}
        </PageContainer>
    )
}

export default Main