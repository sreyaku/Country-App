import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from '../mainPage/mainPage';
import RegisterPage from '../registerPage/registerPage';
import HomePage from '../homePage/homePage';
import Favourite from '../pages/favouritePage/favourite';
import Profile from '../pages/profilePage/profile';
import ProtectedRoutes from '../routes/protectedRoutes';
import PublicRoutes from '../routes/publicRoutes';


function Routing() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route element={<PublicRoutes />}>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/registerpage' element={<RegisterPage />} />
                    </Route>
                    <Route element={<ProtectedRoutes />}>
                        <Route path='/homepage' element={<HomePage />} />
                        <Route path='/favouritecountries' element={<Favourite />} />
                        <Route path='/profilepage' element={<Profile />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    )
}

export default Routing

