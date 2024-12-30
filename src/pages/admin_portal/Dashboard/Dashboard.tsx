import { useEffect } from 'react';

import UserService from 'src/services/api/userService';

import SideBar from 'src/components/admin_portal/SideBar/SideBar';

import './Dashboard.css';

interface DashboardProps {
    setAuth: (auth: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setAuth }) => {

    const userService = UserService();

    const fetchVerifyToken = async () => {
        try {
            const token = localStorage.getItem("token") ?? '';
            await userService.verifyUserSessionToken(token);
        } catch (err) {
            localStorage.removeItem("token");
            setAuth(false);
        }
    };

    useEffect(() => {
        fetchVerifyToken();
    }, []);

    document.body.setAttribute('id', 'dashboard-page');
    return (
        <div className='dashboard'>
            <SideBar />
            <div className='dashboard-body'>

                Dashboard
            </div>
        </div>
    );
}

export default Dashboard;