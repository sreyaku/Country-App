import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineUser } from 'react-icons/ai';
import { BsKey } from 'react-icons/bs';
import Constants from '../../constants.json';
import './signin.css';
import { manageLocalStorage } from '../../countryServices/countryStorage';

function Signin() {
    const navigate = useNavigate()
    const email = 'rohithsk42@gmail.com'
    const password = 'admin'
    const [inputEmail, setInputEmail] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    var details = JSON.parse(localStorage.getItem('registerUser'))
    localStorage.setItem('favouriteCountries', JSON.stringify(''))
    if (details != null) {
        var len = Object.keys(details).length;
    }
    const signInFormHandler = (event) => {
        event.preventDefault()
        if (email === inputEmail && password === inputPassword) {
            manageLocalStorage.set('isLoggedIn', true)

            return (
                navigate('/homepage')
            )
        }
        else if (inputEmail === '' || inputPassword === '') {
            toast.warn('Please enter the details')
        }
        else {
            for (var i = 0; i < len; i++) {
                if (details[i].email === inputEmail && details[i].password === inputPassword) {
                    manageLocalStorage.set('isLoggedIn', true)
                    navigate('/homepage')
                    manageLocalStorage.set('currentUser', details[i].name)
                    break
                }
                if (i == len - 1) {
                    if (details[i].email != inputEmail || details[i].password != inputPassword) {
                        toast.error('Wrong email or password')
                    }
                }
            }
        }
    }
    return (
        <Container fluid>
            <Row>
                <Col className='main-right-side'>
                    <h1 className='main-right-heading'>Login</h1>
                    <div className='main-right-sub'>Please log in into your account</div>
                    <form onSubmit={signInFormHandler}>
                        <Form.Group>
                            <Form.Label className='login-items'><AiOutlineUser className='icons' />{Constants[0].email}</Form.Label>
                            <Form.Control className='form-input' name='email' value={inputEmail} type='text' placeholder={Constants[0].placeholderE} onChange={(event) => setInputEmail(event.target.value)}></Form.Control>
                            <Form.Label className='login-items'><BsKey className='icons' />{Constants[0].password}</Form.Label>
                            <Form.Control className='form-input' name='password' value={inputPassword} type='password' placeholder={Constants[0].placeholderP} onChange={(event) => setInputPassword(event.target.value)}></Form.Control>
                            <button type='submit' className='btn mb-3 sign-in-button'>Login</button>
                        </Form.Group>
                    </form>
                </Col>
            </Row>
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
        </Container>
    )
}

export default Signin
