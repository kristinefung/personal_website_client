import React, { useState, useEffect } from 'react';

import imageProfilePic from 'src/assets/profile_pic.jpeg';
import Timeline from 'src/components/customer_portal/Timeline/Timeline';
import ImageWithBorder from 'src/components/customer_portal/ImageWithBorder/ImageWithBorder';
import WorkService from 'src/services/api/workService';
import EducationService from 'src/services/api/educationService';
import { readableDate } from 'src/utils/common';

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

  const [works, setWorks] = useState<TimelineData[]>([]);
  const [isLoadingWork, setIsLoadingWork] = useState<boolean>(true);
  const [workError, setWorkError] = useState<string | null>(null);

  const [educations, setEducations] = useState<TimelineData[]>([]);
  const [isLoadingEducation, setIsLoadingEducation] = useState<boolean>(true);
  const [educationError, setEducationError] = useState<string | null>(null);

  const workService = WorkService();
  const educationService = EducationService();

  const fetchWorks = async () => {
    setIsLoadingWork(true);
    try {
      const worksResp = await workService.getAllWorks();
      const timelineDatas: TimelineData[] = [];

      worksResp.map(
        (work) => timelineDatas.push({
          title: work.title,
          subTitle: work.companyName,
          date: readableDate(work.startMonth, work.startYear, work.endMonth, work.endYear, work.isCurrent === 1),
          description: work.description
        })
      );

      setWorks(timelineDatas);

    } catch (err) {
      if (err instanceof Error) {
        setWorkError(err.message);
      } else {
        setWorkError("An unknown error occurred");
      }
    } finally {
      setIsLoadingWork(false);
    }
  };

  const fetchEducations = async () => {
    setIsLoadingEducation(true);
    try {
      const educationsResp = await educationService.getAllEducations();
      const timelineDatas: TimelineData[] = [];

      educationsResp.map(
        (education) => timelineDatas.push({
          title: `${education.degree} in ${education.subject}`,
          subTitle: education.schoolName,
          date: readableDate(education.startMonth, education.startYear, education.endMonth, education.endYear, education.isCurrent === 1),
          description: education.description
        })
      );

      setEducations(timelineDatas);

    } catch (err) {
      if (err instanceof Error) {
        setEducationError(err.message);
      } else {
        setEducationError("An unknown error occurred");
      }
    } finally {
      setIsLoadingEducation(false);
    }
  };

  useEffect(() => {
    fetchWorks();
    fetchEducations();
  }, []);

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