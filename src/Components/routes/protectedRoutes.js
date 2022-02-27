import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { manageLocalStorage } from '../countryServices/countryStorage'

const ProtectedRoutes = () =>{
    const status = JSON.parse(manageLocalStorage.get('isLoggedIn')) ? true : false
    return status ? <Outlet /> : <Navigate to={'/'} />
}

export default ProtectedRoutes