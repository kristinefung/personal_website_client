import React from 'react';
import './HomeSection.css';

interface HomeSectionProps {
  homeRef: React.RefObject<HTMLDivElement>;
}

const HomeSection: React.FC<HomeSectionProps> = ({ homeRef }) => {
  return (
    <section ref={homeRef} id="home-section">
      <div className="background">
        DEVELOPER
      </div>
      <div className="foreground">
        <div className="title">
          <p className="small">I'm Kristine, a</p>
          <p className="large">
            <span className="first-letter">F</span>ULL <span className="first-letter">S</span>TACK<br />
            <span className="first-letter">S</span>OFTWARE<br />
            <span className="first-letter">D</span>EVELOPER<span className="fullstop">.</span><br />
          </p>
        </div>
        <a className="btn-normal" href="https://github.com/kristinefung" target="_blank" rel="noopener noreferrer">
          GITHUB
        </a>
      </div>
    </section>
  );
}

export default HomeSection;