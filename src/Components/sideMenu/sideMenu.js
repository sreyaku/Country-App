import React from 'react';
import { useState, useEffect } from 'react';
import { countryDetails } from '../countryServices/countryServices';
import './sideMenu.css';
import CountryNames from '../countryNames/countryNames';
import { Row, Col, Container } from 'react-bootstrap';
import { manageLocalStorage } from '../countryServices/countryStorage';

function SideMenu() {
    const [continents, setContinents] = useState([])
    var uniqueContinents = [...new Set(continents.map(item => item.continent))]
    uniqueContinents = uniqueContinents.sort((a, b) => a.localeCompare(b))
    const [selectedContinent, setSelectedContinent] = useState('')
    // const [status, setStatus] = useState(false)
    useEffect(() => {
        countryDetails().then(res => {
            setContinents(res.data.countries)
        })
            .catch(err => {
                console.log(err)
            })
    }, [])



    const listHandle = (event) => {
        setSelectedContinent(event.target.value)
        // localStorage.setItem('selectedContinent', JSON.stringify(event.target.value))
        manageLocalStorage.set('selectedContinent', event.target.value)
    }



    return (
        <div>
            <Container className='sidemenu-container'>
                <Row className='sidemenu-first-row'>
                    <Col className='sidemenu-first-col' lg={3}>
                        <h1 className='sidemenu-head'>Continents</h1>
                        <ul className='unique-continent-ul'>
                            {
                                uniqueContinents.map(uniqueContinent => { return <li key={uniqueContinent}><button className='unique-continent-li' key={uniqueContinent} value={uniqueContinent} onClick={listHandle}>{uniqueContinent}</button></li> })
                            }
                        </ul>

                    </Col>
                    <Col className='sidemenu-second-col' lg={9}>
                        {selectedContinent == '' ? <CountryNames selectedContinent={uniqueContinents[0]} /> : <CountryNames selectedContinent={selectedContinent} />}
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

CountryNames.defaultProps = 'Africa'

export default SideMenu