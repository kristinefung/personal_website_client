import React from 'react';
import './Timeline.css';

interface TimelineProps {
    datas: {
        title: string,
        subTitle: string,
        date: string,
        description: string
    }[];
}

const Timeline: React.FC<TimelineProps> = ({ datas }) => {
    return (
        <div className="timeline">
            <div className='center-line'></div>
            <div className='wrapper'>
                {datas.map((data, i) => {
                    return (
                        <div key={i} className='row'>
                            <div className='container'>
                                <div className="data">
                                    <div className="header">
                                        <div className="left">
                                            <div className="title">
                                                {data.title}
                                            </div>
                                            <div className="sub-title">
                                                {data.subTitle}
                                            </div>
                                        </div>
                                        <div className="right">
                                            {data.date}
                                        </div>
                                    </div>
                                    <div className="body">
                                        {data.description}
                                    </div>
                                    <div className="footer">
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                }
                )}
            </div>
        </div >
    );
}

export default Timeline;