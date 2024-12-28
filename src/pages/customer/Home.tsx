import React from 'react';

import { useState, useEffect, useRef } from 'react';

import Navbar from "../../components/customer/NavBar";
import HomeSection from "./section/HomeSection";
import AboutSection from './section/AboutSection';
import ProjectSection from './section/ProjectSection';
import ExperienceSection from './section/ExperienceSection';

/*https://www.behance.net/gallery/140168573/Full-Stack-Developer-Portfolio-Website*/
const Home: React.FC = () => {
    const homeRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const projectRef = useRef<HTMLDivElement>(null);
    const experienceRef = useRef<HTMLDivElement>(null);

    const navRefs = {
        homeRef,
        aboutRef,
        projectRef,
        experienceRef
    }

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
                <AboutSection aboutRef={aboutRef} />
                <ProjectSection projectRef={projectRef} />
                <ExperienceSection experienceRef={experienceRef} />
            </div>
        </>
    )
};

export default Home;


