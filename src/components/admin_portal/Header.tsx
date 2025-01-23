import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <div className='dashboard-header flex justify-between items-center h-10 py-2'>
            <div className='left'>

            </div>
            <div className='right'>
                <button className='logout-btn text-white cursor-pointer text-lg bg-transparent border-none' onClick={handleLogout}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
            </div>
        </div>
    );
}

export default Header;