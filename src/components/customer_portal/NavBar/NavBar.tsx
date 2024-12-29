import React, { useState, useRef } from 'react';
import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import imageLogo from '../../../assets/logo.png';
import './NavBar.css';

interface NavbarProps {
    scrollToSec: (ref: React.RefObject<HTMLDivElement>) => void;
    navRefs: {
        homeRef: React.RefObject<HTMLDivElement>;
        aboutRef: React.RefObject<HTMLDivElement>;
        projectRef: React.RefObject<HTMLDivElement>;
        experienceRef: React.RefObject<HTMLDivElement>;
        contactRef: React.RefObject<HTMLDivElement>;
    };
    handleDrawerToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToSec, navRefs, handleDrawerToggle }) => {

    const menu = (
        <ul className="menu">
            <li>
                <a onClick={() => scrollToSec(navRefs.homeRef)}>HOME</a>
            </li>
            <li>
                <a onClick={() => scrollToSec(navRefs.aboutRef)}>ABOUT</a>
            </li>
            <li>
                <a onClick={() => scrollToSec(navRefs.projectRef)}>PROJECT</a>
            </li>
            <li>
                <a onClick={() => scrollToSec(navRefs.experienceRef)}>EXPERIENCE</a>
            </li>
            <li>
                <a
                    className="btn-normal"
                    onClick={() => scrollToSec(navRefs.contactRef)}
                >
                    CONTACT
                </a>
            </li>
        </ul>
    );

    return (
        <div className="navbar">
            <div className="logo">
                <img
                    src={imageLogo}
                    height={40}
                    alt="Logo"
                    onClick={() => scrollToSec(navRefs.homeRef)}
                />
            </div>
            <div className='desktop-menu'>
                {menu}
            </div>
            <div className='mobile-menu'>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default Navbar;