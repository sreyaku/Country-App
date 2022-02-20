import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import './register.css';

function Register() {
    const navigate = useNavigate()
    return (
        <div>
            <Container fluid style={{'padding':'0px'}}>
                <Row>
                    <Col className='main-left-side'>
                        <h1 className='main-left-heading'>Welcome Back!</h1>
                        <div className='main-left-sub'>To keep connected with us please login with your personal info</div>
                        <button className='btn mb-3 sign-up-button' onClick={()=>navigate('/registerpage')}>Sign Up</button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register
