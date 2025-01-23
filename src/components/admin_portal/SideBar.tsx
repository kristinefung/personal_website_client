import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faPaperPlane, faIdCard } from '@fortawesome/free-solid-svg-icons';

const SideBar: React.FC = () => {
    const location = useLocation();

    return (
        <div className='dashboard-sidebar flex flex-col justify-between fixed top-0 left-0 bg-[#242528] h-screen w-[180px] border-r border-[#37373f]'>
            <div className='menu-top'>
                <div className='menu-title text-white flex items-center justify-center h-[40px] p-[10px]'>
                    Dashboard
                </div>
                <ul className="menu-item list-none p-0 pl-[10px] m-0">
                    <li className={`cursor-pointer p-[10px] px-[20px] my-[3px] mx-[10px] rounded-[10px] transition-all duration-500 ease-in-out hover:bg-[#37373f] hover:text-white ${location.pathname.startsWith('/dashboard/profile') ? 'bg-[#37373f] text-white' : 'text-[#a0a4ae]'}`}>
                        <a className={`flex items-center gap-[10px]  text-[16px] transition-all duration-500 ease-in-out`} href="/dashboard/profile">
                            <FontAwesomeIcon icon={faIdCard} />
                            <span>Profile</span>
                        </a>
                    </li>
                    <li className={`cursor-pointer p-[10px] px-[20px] my-[3px] mx-[10px] rounded-[10px] transition-all duration-500 ease-in-out  hover:bg-[#37373f] hover:text-white ${location.pathname.startsWith('/dashboard/enquiry') ? 'bg-[#37373f] text-white' : 'text-[#a0a4ae]'}`}>
                        <a className={`flex items-center gap-[10px] text-[16px] transition-all duration-500 ease-in-out`} href="/dashboard/enquiry">
                            <FontAwesomeIcon icon={faPaperPlane} />
                            <span>Enquiry</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className='menu-bottom'>
                <ul className="menu-item list-none p-0">
                    <li className='cursor-pointer p-[10px] px-[20px] my-[3px] mx-[10px] rounded-[10px] transition-all duration-500 ease-in-out hover:bg-[#37373f] text-white bottom'>
                        <a className='flex items-center gap-[10px]' href="/">
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