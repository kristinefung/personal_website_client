import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { AppBar, Box, Typography, Paper, IconButton, Toolbar, BottomNavigation, BottomNavigationAction, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip } from '@mui/material';

import UserService from 'src/services/api/userService';
import Drawer from './Drawer';
import adminTheme from 'src/theme';

const drawerWidth = 220;
const appbarHeight = 60;
const bottomNavigationHeight = 60;

interface LayoutProps {
    setAuth: (auth: boolean) => void;
}

const Layout: React.FC<LayoutProps> = (props) => {
    const userService = UserService();
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const [isClosing, setIsClosing] = React.useState(false);

    const fetchVerifyToken = async () => {
        try {
            const token = localStorage.getItem("token") ?? '';
            await userService.verifyUserSessionToken(token);
        } catch (err) {
            localStorage.removeItem("token");
            props.setAuth(false);
            navigate('/login');
        }
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
        if (isMobile) {
            setMobileOpen(false);
        }
    };

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    useEffect(() => {
        fetchVerifyToken();
    }, []);

    document.body.setAttribute('id', 'dashboard-page');
    return (
        <>
            <AppBar
                position="fixed"
                color='secondary'
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    height: appbarHeight,
                    ml: { sm: `${drawerWidth}px` }
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Tooltip title="Logout">
                        <IconButton
                            color="inherit"
                            onClick={handleLogout}
                            sx={{ ml: 'auto' }}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>

            <Box sx={{ display: 'flex' }}>
                <Drawer
                    mobileOpen={mobileOpen}
                    handleDrawerTransitionEnd={handleDrawerTransitionEnd}
                    handleDrawerClose={handleDrawerClose} />
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, mt: `${appbarHeight}px`, mb: `${bottomNavigationHeight}px`, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                    <Outlet />
                </Box>
            </Box>
        </>
    );
}

export default Layout;