import React from 'react';

import ImageWithBorder from 'src/components/customer_portal/ImageWithBorder/ImageWithBorder';
import imageProject1 from 'src/assets/project_1.jpeg';

import './ProjectionSection.css';

interface ProjectSectionProps {
  projectRef: React.RefObject<HTMLDivElement>;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ projectRef }) => {

  return (
    <section ref={projectRef} id='portfolio-section'>
      <h1>PROJECT</h1>
      <div className='projects'>
        <div className='project'>
          <div className='text'>
            <div className='title'>
              Personal Website
            </div>
            <div className='description'>
              <p>My web application features a fully responsive website designed to provide an intuitive user experience across all devices. It serves to introduce myself effectively. It highlights my technical skills, showcases my projects, and includes an enquiry form for easy communication between you and me.</p>
              <p>The dashboard acts as a central hub, allowing secure login and management of website profile. Admin can create, read, update, and delete entries for work and education, as well as manage enquiries efficiently. </p>
            </div>
            <div className='read-more'>
              {/* Read more */}
            </div>
          </div>
          <div className='image'>
            <ImageWithBorder className='project-photo' src={imageProject1} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectSection;