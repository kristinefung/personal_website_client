import React from 'react';
import imageLogo from '../../assets/logo.png'

interface NavbarProps {
    scrollToSec: (ref: React.RefObject<HTMLDivElement>) => void;
    navRefs: {
        homeRef: React.RefObject<HTMLDivElement>;
        aboutRef: React.RefObject<HTMLDivElement>;
    };
}

const Navbar: React.FC<NavbarProps> = ({ scrollToSec, navRefs }) => {
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
            <ul className="menu">
                <li>
                    <a onClick={() => scrollToSec(navRefs.homeRef)}>HOME</a>
                </li>
                <li>
                    <a onClick={() => scrollToSec(navRefs.aboutRef)}>ABOUT</a>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;