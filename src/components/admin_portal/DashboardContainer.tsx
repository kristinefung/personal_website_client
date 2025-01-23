import React from 'react';

interface DashboardContainerProps {
    title: string;
    buttonGroup: React.ReactElement<HTMLDivElement>;
    body: React.ReactElement<HTMLDivElement>;
    flex?: number;
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({ title, buttonGroup, body, flex = 'none' }) => {

    return (
        <div className='dashboard-container bg-[#37373f] text-white p-5 rounded-lg w-[100px]' style={{ flex: flex }}>
            <div className='header flex justify-between items-center'>
                <div className='title'>
                    {title}
                </div>
                <div className='button-group'>
                    {buttonGroup}
                </div>
            </div>
            <div className='body overflow-x-auto whitespace-nowrap'>
                {body}
            </div>
        </div>
    );
}

export default DashboardContainer;