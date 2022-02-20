import React from 'react';
import { Nav, Navbar, NavLink } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { manageLocalStorage } from '../countryServices/countryStorage';
import './navigationBar.css';

function NavigationBar() {
    const signoutHandler = () =>{
        localStorage.setItem('currentUser', '')
        manageLocalStorage.set('isLoggedIn', false)
    }
    return (
        <div>
            <Navbar>
                <Container className='navbar-container'>
                    <Navbar.Brand href='/' className='navbar-brand' style={{'color':'white'}}>Country App</Navbar.Brand>
                    <Nav>
                        <NavLink href='/homepage' className='nav-links' style={{'color':'white'}}>Home</NavLink>
                        <NavLink href='/favouritecountries' className='nav-links' style={{'color':'white'}}>Favourite</NavLink>
                        <NavLink href='/profilepage' className='nav-links' style={{'color':'white'}}>Profile</NavLink>
                        <NavLink href='/' className='nav-links' style={{'color':'white'}} onClick={signoutHandler}>Signout</NavLink>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavigationBar
