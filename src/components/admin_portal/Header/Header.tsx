import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import './Header.css';

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <div className='dashboard-header flex justify-between items-center'>
            <div className='left'>

            </div>
            <div className='right'>
                <button className='logout-btn' onClick={handleLogout}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
            </div>
        </div>
    );
}

export default Header;