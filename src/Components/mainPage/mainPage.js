import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { manageLocalStorage } from '../countryServices/countryStorage';
import Register from './register/register';
import Signin from './signin/signin';



function MainPage() {
    localStorage.setItem('currentUser', JSON.stringify(''))
    manageLocalStorage.set('isLoggedIn', false)
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col style={{padding: '0px'}} lg={6} md={12}>
                        <Register />
                    </Col>
                    <Col lg={6} md={12}>
                        <Signin />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MainPage
