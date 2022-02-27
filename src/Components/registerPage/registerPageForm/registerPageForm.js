import React from 'react';
import { useState, useEffect } from 'react';
import { countryDetails } from '../../countryServices/countryServices';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Col, Row, Form } from 'react-bootstrap';
import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { BsKey } from 'react-icons/bs';
import { manageLocalStorage } from '../../countryServices/countryStorage'
import Constants from '../../constants.json';
import './registerPageForm.css';


let registerUser = [];
let count = 0
function RegisterPageForm() {

    const [inputDetails, setInputDetails] = useState({
        name: '',
        email: '',
        country: '',
        password: '',
        confirmPassword: ''
    })

    const [inputErrors, setInputError] = useState({
        nameError: '',
        emailError: '',
        countryError: '',
        passwordError: '',
        confirmPasswordError: ''
    })

    const initialInput = {
        name: '',
        email: '',
        country: '',
        password: '',
        confirmPassword: ''
    }
    const initialInputErrors = {
        nameError: '',
        emailError: '',
        countryError: '',
        passwordError: '',
        confirmPasswordError: ''
    }

    const [countries, setCountries] = useState([])
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()


    const handleChange = (event) => {
        const { name, value } = event.target
        setInputDetails({ ...inputDetails, [name]: value })
    }


    const validate = () => {
        let nameError = ''
        let emailError = ''
        let countryError = ''
        let passwordError = ''
        let confirmPasswordError = ''
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
        const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
        let firstEmailIndex = ((inputDetails.email.length)-4)
        if (!inputDetails.name) {
            nameError = 'Please enter your name'
        }
        if (format.test(inputDetails.name)) {
            nameError = 'Special Character is not allowed'
        }
        if (!inputDetails.email) {
            emailError = 'Please enter your email'
        }
        else if (!regex.test(inputDetails.email)) {
            emailError = 'Please enter a valid email'
        }
        else if(inputDetails.email.charAt(firstEmailIndex) !=='.'){
            emailError = 'Please enter a valid email' 
        }
        else if (JSON.parse(manageLocalStorage.get('registerUser') != null)) {
            var details = JSON.parse(manageLocalStorage.get('registerUser'))
            var len = Object.keys(details).length;
            for (let i = 0; i < len; i++) {
                if (details[i].email === inputDetails.email) {
                    emailError = 'Email ID already exists'
                }
            }
        }
        if (!inputDetails.country) {
            countryError = 'Please select a country'
        }
        if (!inputDetails.password) {
            passwordError = 'Please enter your password'
        }
        else if (format.test(inputDetails.password) || inputDetails.password.length < 5 || inputDetails.password.length > 16) {
            passwordError = 'Special character is not allowed and password length should be between 5 and 16'
        }

        if (!inputDetails.confirmPassword) {
            confirmPasswordError = 'Please enter your password again'
        }
        else if (inputDetails.password !== inputDetails.confirmPassword) {
            confirmPasswordError = 'Please enter your password again'
        }
        if (nameError || emailError || countryError || passwordError || confirmPasswordError) {
            setInputError({ nameError, emailError, countryError, passwordError, confirmPasswordError })
            return false
        }
        return true

    }
    
    const registerFormHandler = (event) => {
        const isValid = validate()
        if (isValid) {
            if (localStorage.getItem('count') != null) {
                registerUser[count] = inputDetails
                count = count + 1
                manageLocalStorage.set('count', count)
                manageLocalStorage.set('registerUser', registerUser)
            } 
            else {
                registerUser[count] = inputDetails
                count = count + 1
                manageLocalStorage.set('count', count)
                manageLocalStorage.set('registerUser', registerUser)
            }
            setSuccess(true)
            setInputDetails(initialInput)
            setInputError(initialInputErrors)
            setTimeout(() => navigate('/'), 500)
            
        }
        event.preventDefault()
    }
    useEffect(() => {
        countryDetails().then(res => {
            setCountries(res.data.countries)
        })
            .catch(err => {
                console.log(err)
            })
        if (JSON.parse(manageLocalStorage.get('registerUser')) != null && manageLocalStorage.get('count')) {
            registerUser = JSON.parse(manageLocalStorage.get('registerUser'))
            count = JSON.parse(manageLocalStorage.get('count'))
        }
    }, [])
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col>
                        <h1 className='register-head'>Registration Page</h1>
                        <form onSubmit={registerFormHandler}>
                            <Form.Group className='form-group'>
                                <Form.Label className='register-input-head'><AiOutlineUser className='register-icons' />{Constants[0].name}</Form.Label>
                                <Form.Control className='register-input' type='text' name='name' value={inputDetails.name} placeholder={Constants[0].placeholderN} onChange={handleChange} style={{ 'width': '500px' }}></Form.Control>
                                <div className='error-messages'>{inputErrors.nameError}</div>
                                <Form.Label className='register-input-head'><HiOutlineMail className='register-icons' />{Constants[0].email}</Form.Label>
                                <Form.Control className='register-input' type='text' name='email' value={inputDetails.email} placeholder={Constants[0].placeholderE} onChange={handleChange} style={{ 'width': '500px' }}></Form.Control>
                                <div className='error-messages'>{inputErrors.emailError}</div>
                                <select className='dropdown' name='country' value={inputDetails.country} onChange={handleChange}>
                                    <option>-- Select Country --</option>
                                    {countries.map(country => {
                                        return <option key={country.name} >{country.name}</option>
                                    })}
                                </select><br />
                                <div className='error-messages'>{inputErrors.countryError}</div>
                                <Form.Label className='register-input-head'><BsKey className='register-icons' />{Constants[0].password}</Form.Label>
                                <Form.Control className='register-input' type='password' name='password' value={inputDetails.password} placeholder={Constants[0].placeholderP} onChange={handleChange} style={{ width: '500px' }}></Form.Control>
                                <div className='error-messages'>{inputErrors.passwordError}</div>
                                <Form.Label className='register-input-head'><BsKey className='register-icons' />{Constants[0].confirmPassword}</Form.Label>
                                <Form.Control className='register-input' type='password' name='confirmPassword' value={inputDetails.confirmPassword} placeholder={Constants[0].placeholderC} onChange={handleChange} style={{ 'width': '500px' }}></Form.Control>
                                <div className='error-messages'>{inputErrors.confirmPasswordError}</div>
                                {success && <h1 className='success-message'>Registration Success</h1>}
                                <button type='submit' className='register-button'>Register</button>
                            </Form.Group>
                        </form>
                        <Link to='/'>
                            <button className='register-go-back-button'>Go back</button>
                        </Link>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default RegisterPageForm;

