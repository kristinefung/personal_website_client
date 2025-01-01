import React from 'react';

import './DashboardContainer.css';

interface DashboardContainerProps {
    title: string;
    buttonGroup: React.ReactElement<HTMLDivElement>;
    body: React.ReactElement<HTMLDivElement>;
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({ title, buttonGroup, body }) => {

    return (
        <div className='dashboard-container'>
            <div className='header'>
                <div className='title'>
                    {title}
                </div>
                <div className='button-group'>
                    {buttonGroup}
                </div>
            </div>
            <div className='body'>
                {body}
            </div>
        </div>
    );
}

export default DashboardContainer;