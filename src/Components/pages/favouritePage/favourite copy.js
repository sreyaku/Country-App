import React, { useState, useEffect, useContext } from 'react';
import { countryDetails } from '../../countryServices/countryServices';
import NavigationBar from '../../navbar/navigationBar';
import Pagination from '../../pagination/pagination';
import Popup from '../../popup/popup';
import CountryNameDetails from '../../countryNameDetails/countryNameDetails'
import './favourite.css';
import CountryContext from '../../core/Context/countryContext';
import { manageLocalStorage } from '../../countryServices/countryStorage';


let favouriteCountries
let selectedFavouriteCountries
function Favourite() {
  const [currentPost, setCurrentPost] = useState(1)
  const [postPerPage, setPostPerPage] = useState(5)
  const [count, setCount] = useState(0)
  const [popup, setPopup] = useState(false)
  const [countryName, setCountryName] = useState('')
  const indexOfLastPost = currentPost * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const countries = useContext(CountryContext) 


  useEffect(() => {
    if (JSON.parse(manageLocalStorage.get('favouriteCountries')) != "") {
      selectedFavouriteCountries = JSON.parse(manageLocalStorage.get('favouriteCountries'))
    }
  }, [count])

  const paginate = (pageNumber) => {
    setCurrentPost([pageNumber])
  }

  const detailsHandle = (event) => {
    setPopup(true)
    setCountryName(event.target.value)

  }

  const removeHandler = (event) => {
    let country = event.target.value
    const favouriteCountries = selectedFavouriteCountries.filter((item) => {
      setCount(count + 1)
      return item != country
    })
    selectedFavouriteCountries = favouriteCountries
    manageLocalStorage.set('favouriteCountries', JSON.stringify(selectedFavouriteCountries))
  }

  return (
    <div>
      <NavigationBar />
      <div className='country-div'>
        <ul className='country-ul'>
          <h1 className='favourite-country-head'>Favourite Countries</h1>
          {
            selectedFavouriteCountries != null ? selectedFavouriteCountries.slice(indexOfFirstPost, indexOfLastPost).map(selectedFavouriteCountry => { return <li className='country-li' key={selectedFavouriteCountry}><div className='favourite-list-div'>{selectedFavouriteCountry}</div><button className='remove-button' value={selectedFavouriteCountry} onClick={removeHandler}>Remove</button><button className='details-view-button' value={selectedFavouriteCountry} onClick={detailsHandle}>Details View</button></li> }) : null
          }
        </ul>
        {
          selectedFavouriteCountries != null ? <Pagination postsPerPage={postPerPage} totalPosts={selectedFavouriteCountries.length} paginate={paginate} /> : null
        }
        {
          JSON.parse(localStorage.getItem('favouriteCountries')) == '' ? <h1 className='favourite-page-error'>No Favourite Countries! Select Some!</h1> : null
        }

      </div>
      <Popup trigger={popup} setTrigger={setPopup}>
        <h1 className='country-details-main-head'>Country Details</h1>
          <CountryNameDetails name={countryName} />
      </Popup>
    </div >
  )
}

export default Favourite;

  