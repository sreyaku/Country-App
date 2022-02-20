import { BrowserRouter as Router,
  Routes,
  Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from '../src/Components/mainPage/mainPage'
import RegisterPage from '../src/Components/registerPage/registerPage'
import HomePage from './Components/homePage/homePage';
import Favourite from './Components/pages/favouritePage/favourite';
import Profile from './Components/pages/profilePage/profile';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path ='/' element={<MainPage />} />
          <Route path='/registerpage' element={<RegisterPage />} />
          <Route path='/homepage' element={<HomePage />} />
          <Route path='/favouritecountries' element={<Favourite />} />
          <Route path='/profilepage' element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
