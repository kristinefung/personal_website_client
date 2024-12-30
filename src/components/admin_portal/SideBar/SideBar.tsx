import { useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faPaperPlane, faIdCard } from '@fortawesome/free-solid-svg-icons';

import './SideBar.css';

interface SideBarProps {
}

const SideBar: React.FC<SideBarProps> = () => {
    const location = useLocation();

    return (
        <div className='dashboard-sidebar'>
            <div className='menu-top'>
                <div className='menu-title'>
                    Dashboard
                </div>
                <ul className="menu-item">
                    <li className={location.pathname.startsWith('/dashboard') ? 'active' : ''}>
                        <a href="/dashboard/profile">
                            <FontAwesomeIcon icon={faIdCard} />
                            <span>Profile</span>
                        </a>
                    </li>
                    <li className={location.pathname.startsWith('/dashboard/enquiry') ? 'active' : ''}>
                        <a href="/dashboard/enquiry">
                            <FontAwesomeIcon icon={faPaperPlane} />
                            <span>Enquiry</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className='menu-bottom'>
                <ul className="menu-item">
                    <li className='bottom'>
                        <a href="/">
                            <FontAwesomeIcon icon={faHouse} />
                            <span>Website</span>
                        </a>
                    </li>
                </ul>
            </div>

        </div>
    );
}

export default SideBar;