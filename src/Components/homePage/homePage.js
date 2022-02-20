import React from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import CountryNames from '../countryNames/countryNames';
import { manageLocalStorage } from '../countryServices/countryStorage';
import NavigationBar from '../navbar/navigationBar';
import SideMenu from '../sideMenu/sideMenu';
import './homePage.css';


function HomePage(){
    return(    
        <div style={{padding:'0px'}}>
            <Container fluid>
                <Row className='homepage-first-row'> 
                    <Col className='homepage-first-col'>
                        <NavigationBar />
                    </Col>
                </Row>
                <Row>
                    <Col className='homepage-second-col'>
                        <SideMenu />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HomePage