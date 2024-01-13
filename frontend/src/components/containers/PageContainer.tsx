import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    title: string;
}

const PageContainer: React.FC<Props> = ({ title, children }) => {
    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-center'>{title}</h1>
            {children}
        </div>
    )
}

export default PageContainer