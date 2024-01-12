import { Outlet } from 'react-router-dom'
import Header from './Header'
import React from 'react'

const MainLayout = () => {
    return (
        <React.Fragment>
            <Header />
            <div className='pt-28' />
            <Outlet />
        </React.Fragment>
    )
}

export default MainLayout