import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import imageProfilePic from 'src/assets/profile_pic.jpeg';
import Timeline from 'src/components/customer_portal/Timeline/Timeline';
import ImageWithBorder from 'src/components/customer_portal/ImageWithBorder/ImageWithBorder';
import { readableDate } from 'src/utils/common';
import workStore from 'src/store/workStore';
import educationStore from 'src/store/educationStore';
import { IWork } from 'src/services/api/workService';
import { IEducation } from 'src/services/api/educationService';

import './AboutSection.css';

interface AboutSectionProps {
  aboutRef: React.RefObject<HTMLDivElement>;
}

type TimelineData = {
  title: string;
  subTitle: string;
  date: string;
  description: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ aboutRef }) => {
  useEffect(() => {
    workStore.fetchWorks();
    educationStore.fetchEducations();
  }, []);

  const works: TimelineData[] = workStore.works.map((work: IWork) => ({
    title: work.title || '',
    subTitle: work.companyName || '',
    date: readableDate(
      work.startMonth || 0,
      work.startYear || 0,
      work.endMonth || 0,
      work.endYear || 0,
      work.isCurrent || false
    ),
    description: work.description ? work.description.replace(/\n/g, "<br />") : ""
  }));

  const educations: TimelineData[] = educationStore.educations.map((education: IEducation) => ({
    title: `${education.degree} in ${education.subject}`,
    subTitle: education.schoolName,
    date: readableDate(
      education.startMonth,
      education.startYear,
      education.endMonth,
      education.endYear,
      education.isCurrent
    ),
    description: education.description
  }));

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

export default observer(AboutSection);