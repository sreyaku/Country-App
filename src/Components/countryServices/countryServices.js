import axios from 'axios';
import Constants from '../constants.json'

function countryDetails() {
    return axios.get(Constants[0].url)
}

export { 
    countryDetails
}