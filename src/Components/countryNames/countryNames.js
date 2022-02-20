import React from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import CountryDetails from '../countryNameDetails/countryNameDetails';
import { countryDetails } from '../countryServices/countryServices';
import Pagination from '../pagination/pagination';
import Popup from '../popup/popup';
import CountryNameDetails from '../countryNameDetails/countryNameDetails';
import { manageLocalStorage } from '../countryServices/countryStorage';
import './countryNames.css';



let favouriteCountries = []
function CountryNames(props) {
    const [popup, setPopup] = useState(false)
    const [countries, setCountries] = useState([])
    const [countryName, setCountryName] = useState('')
    const [currentPost, setCurrentPost] = useState(1)
    const [postPerPage, setPostPerPage] = useState(5)
    const [favourite, setFavourite] = useState()

    const indexOfLastPost = currentPost * postPerPage
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const matchedCountries = []
    let count = 0



    useEffect(() => {
        countryDetails().then(res => {
            setCountries(res.data.countries)
        })
            .catch(err => {
                console.log(err)
            })
        if (JSON.parse(localStorage.getItem('favouriteCountries')) != '') {
            let selectedFavouriteCountries = JSON.parse(manageLocalStorage.get('favouriteCountries'))
            for (let i = 0; i < selectedFavouriteCountries.length; i++) {
                favouriteCountries.push(selectedFavouriteCountries[i])
            }
            setCurrentPost(1)
        }
    }, [props.selectedContinent])

    const detailsHandle = (event) => {
        setPopup(true)
        setCountryName(event.target.value)
    }

    const paginate = (pageNumber) => {
        setCurrentPost(pageNumber)
    }

    const favouriteHandler = (event) => {
        if (favouriteCountries === []) {
            favouriteCountries.push(event.target.value)
            setFavourite(event.target.value)
        }
        else {
            for (let i = 0; i < favouriteCountries.length; i++) {
                if (favouriteCountries[i] === event.target.value) {
                    count = 1
                    toast.info('Already Addded')
                    break
                }
                count = 0
            }
            if (count === 0) {
                favouriteCountries.push(event.target.value)
                count = 0
                setFavourite(event.target.value)
            }
        }
        localStorage.setItem('favouriteCountries', JSON.stringify(favouriteCountries))
    }

    return (
        <div className='country-name-div'>
            <h1 className='country-name-head'>Click on Continent to get Country names</h1>
            <h1 className='country-name-sub'>{props.selectedContinent}</h1>
            {

                countries.map(country => {

                    if (country.continent === props.selectedContinent) {
                        matchedCountries.push(country.name)

                    }
                })
            }

            {

                matchedCountries.slice(indexOfFirstPost, indexOfLastPost).map((country, index) => <li className='country-list' key={country} value={country}><div className='country-list-div'>{country}</div><button className='favourite-button' name={index} value={country} onClick={favouriteHandler}>{favouriteCountries.includes(country) ? "Added" : "Favourite"}</button><button className='details-view-button' value={country} onClick={detailsHandle}>Details View</button></li>)
            }

            <Pagination postsPerPage={postPerPage} totalPosts={matchedCountries.length} paginate={paginate} />
            <Popup trigger={popup} setTrigger={setPopup}>
                <h1 className='country-details-main-head'>Country Details</h1>
                <CountryNameDetails name={countryName} />
            </Popup>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
            />
        </div>
    )
}

export default CountryNames