import React, { useState } from 'react';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import {Nav, NavLink, MobileIcon, NavMenu, NavItem, NavLogo} from './NavbarElements';
import { animateScroll as scroll} from 'react-scroll';

const Navbar = () => {
    const [click, setClick] = useState(false)
    function handleClick() {setClick(!click);}
    function toggleHome() {scroll.scrollToTop();}

    return (
        <div>
        <Nav>
            <NavLogo to="/" onClick={click ? () => {handleClick();toggleHome();} : toggleHome} >
                <h1>EJAR</h1>
            </NavLogo>
            <NavMenu onClick={handleClick} click={click}>
                <NavItem>
                    <NavLink to="about" smooth={true} duration={500} spy={true} exact='true' offset={-80} onClick={handleClick}>About</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="app-features" smooth={true} duration={500} spy={true} exact='true' offset={-80} onClick={handleClick}>App Features</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="contact" smooth={true} duration={500} spy={true} exact='true' offset={-80} onClick={handleClick}>Contact</NavLink>
                </NavItem>
                {/* <NavBtnLink to="/signin">Sign In</NavBtnLink> May not need this login button */}
            </NavMenu>
            <MobileIcon onClick={handleClick}>{click ? <FaTimes/> : <FaBars/>}</MobileIcon>
        </Nav>
        </div>
    )
}

export default Navbar
