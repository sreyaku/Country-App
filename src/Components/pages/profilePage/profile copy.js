import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import NavigationBar from '../../Navbar/NavigationBar';
import Constants from '../../constants.json';
import './Profile.css';


function Profile() {
  const [nameError, setNameError] = useState('')
  const [nameError, setNameError] = useState('')
  const [passwordError, setPasswordError ] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const passwordRef = useRef()
  const displayNameRef = useRef()
  const [changePassWord, setchangePassWord] = useState(false)
  const [changeDisplayName, setChangeDisplayName] = useState(false)
  const [userCountry, setUserCountry] = useState('')
  const [countries, setCountries] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    axios.get(Constants[0].url)
      .then(res => {
        setCountries(res.data.countries)
        var details = JSON.parse(localStorage.getItem('registerUser'))
        console.log(JSON.parse(localStorage.getItem('registerUser')))
        var len = Object.keys(details).length;
        for (let i = 0; i < len; i++) {
          if (details[i].name === localStorage.getItem('currentUser')) {
            setName(details[i].name)
            setPassword(details[i].password)
            setEmail(details[i].email)
            setUserCountry(details[i].country)
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const cancelChangeDisplayName = () => {
    setChangeDisplayName(false)
  }


  const updateDisplayName = () => {
    if(!displayNameRef.current.value){
      setNameError('Error')
    }
    setName(displayNameRef.current.value)
    setChangeDisplayName(false);
    const dataObject = {
      name: displayNameRef.current.value,
      email: email,
      country: userCountry,
      password: password
    }
      localStorage.setItem('currentUser', displayNameRef.current.value)
      var details = JSON.parse(localStorage.getItem('registerUser'))
      console.log(details)
      const index = details.findIndex((item) => item.email == email);
      console.log(index)
      details[index] = dataObject;
      localStorage.setItem('registerUser', JSON.stringify(details))
      console.log(JSON.parse(localStorage.getItem('registerUser')))
  }

  const enableChangeDisplayName = () => {
    setChangeDisplayName(true)
  }

  const enableChangePassword = () => {
    setchangePassWord(true)
  }
  const updatePassword = () => {
    setPassword(passwordRef.current.value)
    setchangePassWord(false);
      const dataObject = {
        name: name,
        email: email,
        country: userCountry,
        password: passwordRef.current.value
    }
      var details = JSON.parse(localStorage.getItem('registerUser'))
      console.log(details)
      const index = details.findIndex((item) => item.email == email);
      console.log(index)
      details[index] = dataObject;
      localStorage.setItem('registerUser', JSON.stringify(details))
      console.log(JSON.parse(localStorage.getItem('registerUser')))

  }
  const cancelPasswordChange = () => {
    setchangePassWord(false)
  }

  const deleteHandler = () => {
    console.log(localStorage.getItem('currentUser'))
    let details = JSON.parse(localStorage.getItem('registerUser'));
    let newDetails = details.filter((item) => item.email != email);
    localStorage.setItem('registerUser', JSON.stringify(newDetails));
    console.log(JSON.parse(localStorage.getItem('registerUser')))
    navigate('/')

  }


  return (
    <div>
      <NavigationBar />
      <Container>
        <Row>
          <Col className='profile-first-col' lg={7}>
            <Table className='profile-table'>
              <tbody className='table-body'>
                <tr className='table-row'>
                  <td className='table-data'>E-Mail ID</td>
                  <td className='table-data'>{email}</td>
                  <td className='table-data'></td>
                  <td className='table-data'></td>
                </tr>
                <tr className='table-row'>
                  <td className='table-data'>Display Name</td>
                  <td className='table-data'>{changeDisplayName ? <Form.Control className='profile-form-input' type="text" ref={displayNameRef}></Form.Control> : name}</td>
                  <td className='table-data'><Button variant={changeDisplayName ? "success" : "danger"} onClick={changeDisplayName ? updateDisplayName : enableChangeDisplayName}>{changeDisplayName ? "Update" : "Change"}</Button></td>
                  {changeDisplayName ? <td><Button variant="danger" onClick={cancelChangeDisplayName}>Cancel</Button></td> : <td></td>}
                  <div className='error-messages'>{nameError}</div>

                </tr>
                <tr className='table-row'>
                  <td className='table-data'>Password </td>
                  <td className='table-data'>{changePassWord ? <Form.Control className='profile-form-input' type="password" ref={passwordRef}></Form.Control> : password}</td>
                  <td className='table-data'><Button variant={changePassWord ? "success" : "danger"} onClick={changePassWord ? updatePassword : enableChangePassword}>{changePassWord ? "Update" : "Change"}</Button></td>
                  {changePassWord ? <td><Button variant="danger" onClick={cancelPasswordChange}>Cancel</Button></td> : <td></td>}
                </tr>
              </tbody>
            </Table>
            <Button className='delete-button' variant='danger' onClick={deleteHandler} style={{ marginBottom: '10px' }}>Delete Account</Button>
          </Col>
          <Col className='profile-second-col' lg={4}>
            {
              countries.map(country => {
                if (country.name === userCountry) {
                  return (
                    <ul className='country-details-ul'>User Country Details
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
          </Col>
        </Row>
      </Container>

    </div >
  )
}

export default Profile;
