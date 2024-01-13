import React, { PropsWithChildren, useEffect, useState } from 'react'
import { checkTokenAsyncAction } from '../../store/slices/user';
import { useAppDispatch } from '../../store/hooks';
import Loader from './Loader';

const CheckAuth: React.FC<PropsWithChildren> = ({ children }) => {
    const dispatch = useAppDispatch();

    const [isCheckingToken, setIsCheckingToken] = useState(true);

    useEffect(() => {
        dispatch(checkTokenAsyncAction())
            .then((data) => {
                if (data.meta.requestStatus === 'fulfilled') {
                    setTimeout(() => {
                        setIsCheckingToken(false);
                    }, 1000);
                }
            })
    }, [])

    if (isCheckingToken) {
        return (
            <Loader />
        )
    }

    return (
        children
    )
}

export default CheckAuth