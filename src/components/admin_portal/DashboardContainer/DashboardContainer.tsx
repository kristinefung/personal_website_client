import React from 'react';

import './DashboardContainer.css';

interface DashboardContainerProps {
    title: string;
    buttonGroup: React.ReactElement<HTMLDivElement>;
    body: React.ReactElement<HTMLDivElement>;
    flex?: number;
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({ title, buttonGroup, body, flex = 'none' }) => {

    return (
        <div className='dashboard-container' style={{ flex: flex }}>
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