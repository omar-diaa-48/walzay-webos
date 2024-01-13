import React, { PropsWithChildren, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { RootState } from '../../store'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'
import { checkTokenAsyncAction } from '../../store/slices/user'

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { isAuthenticated } = useAppSelector((state: RootState) => state.user)
    const [isCheckingToken, setIsCheckingToken] = useState(true);

    useEffect(() => {
        if (!isCheckingToken && !isAuthenticated) {
            navigate("/sign-in");
        }
    }, [isCheckingToken, isAuthenticated])

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

export default ProtectedRoute