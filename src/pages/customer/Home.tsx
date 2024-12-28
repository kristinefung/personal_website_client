import React from 'react';

import { useState, useEffect, useRef } from 'react';

import Navbar from "../../components/customer/NavBar";
import HomeSection from "./section/HomeSection";

/*https://www.behance.net/gallery/140168573/Full-Stack-Developer-Portfolio-Website*/
const Home: React.FC = () => {
    const homeRef = useRef<HTMLDivElement>(null);
    const navRefs = { homeRef }

    const scrollToSec = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    document.body.setAttribute('id', 'website-page');
    return (
        <>
            <div id='website'>
                <Navbar
                    scrollToSec={scrollToSec}
                    navRefs={navRefs}
                />
                <HomeSection homeRef={homeRef} />
            </div>
        </>
    )
};

export default Home;


