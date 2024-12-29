import React, { useRef, useState } from 'react';

import { Drawer, IconButton } from '@mui/material';

import Navbar from "../../components/customer_portal/NavBar/NavBar";
import HomeSection from "./section/HomeSection/HomeSection";
import AboutSection from './section/AboutSection/AboutSection';
import ProjectSection from './section/ProjectSection/ProjectSection';
import ExperienceSection from './section/ExperienceSection/ExperienceSection';
import ContactSection from './section/ContactSection/ContactSection';

import './Home.css';

/*https://www.behance.net/gallery/140168573/Full-Stack-Developer-Portfolio-Website*/
const Home: React.FC = () => {
    const homeRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const projectRef = useRef<HTMLDivElement>(null);
    const experienceRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const containerRef = useRef(null);

    const handleDrawerToggle = () => {
        setDrawerOpen((prevState) => !prevState);
    };

    const navRefs = {
        homeRef,
        aboutRef,
        projectRef,
        experienceRef,
        contactRef
    }

    const scrollToSec = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    document.body.setAttribute('id', 'website-page');
    return (
        <>
            <div id='website' ref={containerRef}>
                <Navbar
                    scrollToSec={scrollToSec}
                    navRefs={navRefs}
                    handleDrawerToggle={handleDrawerToggle}
                />
                <Drawer
                    container={contactRef.current}
                    anchor="right"
                    variant="temporary"
                    open={drawerOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
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
                </Drawer>

                <HomeSection homeRef={homeRef} />
                <AboutSection aboutRef={aboutRef} />
                <ProjectSection projectRef={projectRef} />
                <ExperienceSection experienceRef={experienceRef} />
                <ContactSection contactRef={contactRef} />
            </div>
        </>
    )
};

export default Home;


