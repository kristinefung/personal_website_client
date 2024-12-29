import React from 'react';

import DockerIcon from 'src/assets/language_icon/docker.png';
import FlutterIcon from 'src/assets/language_icon/flutter.png';
import GolangIcon from 'src/assets/language_icon/golang.png';
import HtmlIcon from 'src/assets/language_icon/html.png';
import MssqlIcon from 'src/assets/language_icon/mssql.png';
import MysqlIcon from 'src/assets/language_icon/mysql.png';
import NodejsIcon from 'src/assets/language_icon/nodejs.png';
import ReactjsIcon from 'src/assets/language_icon/reactjs.png';

import './ExperienceSection.css';

interface ExperienceSectionProps {
  experienceRef: React.RefObject<HTMLDivElement>;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experienceRef }) => {

  const experiences = [
    {
      image: DockerIcon,
      name: 'Docker'
    },
    {
      image: FlutterIcon,
      name: 'Flutter'
    },
    {
      image: GolangIcon,
      name: 'Go Lang'
    },
    {
      image: HtmlIcon,
      name: 'HTML'
    },
    {
      image: MssqlIcon,
      name: 'SQL Server'
    },
    {
      image: MysqlIcon,
      name: 'My SQL'
    },
    {
      image: NodejsIcon,
      name: 'Node JS'
    },
    {
      image: ReactjsIcon,
      name: 'React JS'
    },
  ]


  return (
    <section ref={experienceRef} id='experience-section'>
      <h1>EXPERIENCE</h1>
      <div className="experiences">
        {experiences.map(
          (experience, i) => {
            return (
              <div key={i} className="experience">
                <div className="image">
                  <img src={experience.image} />
                </div>
                <div className="name">
                  {experience.name}
                </div>
              </div>
            )
          }
        )}

      </div>
    </section>
  );
}

export default ExperienceSection;