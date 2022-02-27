import React, { useState, useEffect } from 'react'
import CountryContext from './countryContext'
import { countryDetails } from '../../countryServices/countryServices'


const CountryState = (props ) =>{
    const [countryData, setCountryData] = useState([])
    useEffect(()=>{
        countryDetails().then(res =>{
            setCountryData(res.data.countries)
        })
        .catch(err =>{
            console.log(err)
        })
    }, [])
    return(
        <CountryContext.Provider value={countryData}>
            {props.children}
        </CountryContext.Provider>
    )
}

export default CountryState