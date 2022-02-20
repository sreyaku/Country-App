import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Pagination from '../Pagination/pagination';
import Popup from '../Popup/popup';
import Constants from '../constants.json';
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
        axios.get(Constants[0].url)
            .then(res => {
                setCountries(res.data.countries)
            })
            .catch(err => {
                console.log(err)
            })
        if (JSON.parse(localStorage.getItem('favouriteCountries')) != '') {
            let selectedFavouriteCountries = JSON.parse(localStorage.getItem('favouriteCountries'))
            for (let i = 0; i < selectedFavouriteCountries.length; i++) {
                favouriteCountries.push(selectedFavouriteCountries[i])
            }
            console.log(currentPost)
            setCurrentPost(1)
            console.log(props.selectedContinent)
            console.log(favouriteCountries)
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
        console.log(event.target.name)
        if (favouriteCountries === []) {
            console.log(event.target.value)
            favouriteCountries.push(event.target.value)
            setFavourite(event.target.value)
            console.log(favourite)
        }
        else {
            console.log(event.target.value)
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
                console.log(favourite)
            
            }
        }
        console.log(favouriteCountries)
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
               
                matchedCountries.slice(indexOfFirstPost, indexOfLastPost).map((country, index)=><li className='country-list' key={country}  value={country}><div className='country-list-div'>{country}</div><button className='favourite-button' name={index} value={country} onClick={favouriteHandler}>{favouriteCountries.includes(country) ? "Added" : "Favourite"}</button><button className='details-view-button' value={country} onClick={detailsHandle}>Details View</button></li>)
            }
            
            <Pagination postsPerPage={postPerPage} totalPosts={matchedCountries.length} paginate={paginate} />
            <Popup trigger={popup} setTrigger={setPopup}>
                <h1 className='country-details-main-head'>Country Details</h1>
                {
                    countries.map(country => {
                        if (country.name === countryName) {
                            return (

                                <ul className='country-details-ul'>
                                    <li className='country-details-li' key={country.name}><span className='country-details-head'>Country ID:</span> {country.id}</li>
                                    <li className='country-details-li' key={country.name}><span className='country-details-head'>Country Name:</span> {country.name}</li>
                                    <li className='country-details-li' key={country.name}><span className='country-details-head'>Country Abbreviation:</span> {country.abbr3}</li>
                                    <li className='country-details-li' key={country.name}><span className='country-details-head'>Country ALTName:</span> {country.altName}</li>
                                    <li className='country-details-li' key={country.name}><span className='country-details-head'>Continent:</span> {country.continent}</li>
                                    <li className='country-details-li' key={country.name}><span className='country-details-head'>Units of Distance:</span> {country.distanceUnits}</li>
                                    <li className='country-details-li' key={country.name}><span className='country-details-head'>ESRI Units:</span> {country.esriUnits}</li>
                                </ul>
                            )
                        }

                    })
                }

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