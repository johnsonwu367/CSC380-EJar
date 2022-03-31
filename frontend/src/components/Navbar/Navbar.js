import React, { useState } from 'react';
// import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import {Nav, NavLink, MobileIcon, NavMenu, NavBtnLink, NavItem, NavLogo} from './NavbarElements';

const Navbar = () => {
    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

    return (
        <div>
        <Nav>
            <NavLogo to="/">
                <h1>EJAR</h1>
            </NavLogo>
            <NavMenu onClick={handleClick} click={click}>
                <NavItem>
                    <NavLink to="/about" activeStyle>About</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/app-features" activeStyle>App Features</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/contact" activeStyle>Contact</NavLink>
                </NavItem>
                {/* <NavBtnLink to="/signin">Sign In</NavBtnLink> May not need this login button */}
            </NavMenu>
            <MobileIcon onClick={handleClick}>{click ? <FaTimes/> : <FaBars/>}</MobileIcon>
        </Nav>
        </div>
    )
}

export default Navbar
