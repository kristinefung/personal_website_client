import React from 'react';
import Timeline from '../../../components/customer/Timeline';
import ImageWithBorder from '../../../components/customer/ImageWithBorder';
import imageProfilePic from '../../../assets/profile_pic.jpeg';
import '../../../styles/Timeline.css';

interface AboutSectionProps {
  aboutRef: React.RefObject<HTMLDivElement>;
}

const AboutSection: React.FC<AboutSectionProps> = ({ aboutRef }) => {
  const works = [{
    title: "string",
    subTitle: "string",
    date: "string",
    description: "string"
  }];

  const educations = [{
    title: "string",
    subTitle: "string",
    date: "string",
    description: "string"
  }];

  return (
    <section ref={aboutRef} id='about-section'>
      <div className='about-me'>
        <div className="left">
          <ImageWithBorder className='my-photo' src={imageProfilePic} />
        </div>
        <div className="right">
          <div className="text">
            <h1>ABOUT ME</h1>
            <div className='detail'>
              A detail-oriented programmer with 2 years of experience in software development industry. Focusing on backend development such as PHP and GoLang. Possess a
              strong passion for problem solving and learning new technologies.
            </div>
          </div>
          <div className="btn-row">
            <a className='btn-normal'>Resume</a>
          </div>
        </div>
      </div>
      <div className='about-work' >
        <p>WORK JOURNEY</p>
        <Timeline datas={works} />
      </div>
      <div className='about-education' >
        <p>STUDY JOURNEY</p>
        <Timeline datas={educations} />
      </div>
    </section>
  );
}

export default AboutSection;