import React, { useState, useEffect } from 'react';
import { countryDetails } from '../../countryServices/countryServices';
import NavigationBar from '../../navbar/navigationBar';
import Pagination from '../../pagination/pagination';
import Popup from '../../popup/popup';
import CountryNameDetails from '../../countryNameDetails/countryNameDetails'
import './favourite.css';


let favouriteCountries
let selectedFavouriteCountries
function Favourite() {
  const [currentPost, setCurrentPost] = useState(1)
  const [postPerPage, setPostPerPage] = useState(5)
  const [popup, setPopup] = useState(false)
  const [countries, setCountries] = useState([])
  const [countryName, setCountryName] = useState('')
  const indexOfLastPost = currentPost * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage

  useEffect(() => {
    countryDetails().then(res => {
      setCountries(res.data.countries)
    })
      .catch(err => {
        console.log(err)
      })
    if (JSON.parse(localStorage.getItem('favouriteCountries')) != null) {
      favouriteCountries = JSON.parse(localStorage.getItem('favouriteCountries'))
      selectedFavouriteCountries = [...new Set(favouriteCountries.map(item => item))]
    }
  }, [selectedFavouriteCountries])

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
      return item != country

    })
    selectedFavouriteCountries = favouriteCountries
    localStorage.setItem('favouriteCountries', JSON.stringify(selectedFavouriteCountries))
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
