import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { manageLocalStorage } from '../countryServices/countryStorage'

const PublicRoutes = () =>{
    const status = manageLocalStorage.get('isLoggedIn') ? true : false
    return status && <Outlet /> 

}

export default PublicRoutes