import React, { PropsWithChildren } from 'react'
import Loader from '../layout/Loader';
import Error from '../layout/Error';

interface Props extends PropsWithChildren {
    title: string;
    isLoading: boolean;
    error: Error | null;
}

const PageContainer: React.FC<Props> = ({ title, isLoading, error, children }) => {
    if (isLoading) {
        return (
            <Loader />
        )
    }

    if (error) {
        return (
            <Error message={error.message} />
        )
    }

    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-center'>{title}</h1>
            {children}
        </div>
    )
}

export default PageContainer