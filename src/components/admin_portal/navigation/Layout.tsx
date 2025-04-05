import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { AppBar, Box, Typography, Paper, IconButton, Toolbar, BottomNavigation, BottomNavigationAction } from '@mui/material';

import UserService from 'src/services/api/userService';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';

import Drawer from './Drawer';
import theme from '../../../theme';

const drawerWidth = 220;
const appbarHeight = 60;
const bottomNavigationHeight = 60;

interface LayoutProps {
    setAuth: (auth: boolean) => void;
}

const Layout: React.FC<LayoutProps> = (props) => {

    const userService = UserService();

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const [isClosing, setIsClosing] = React.useState(false);

    const fetchVerifyToken = async () => {
        try {
            const token = localStorage.getItem("token") ?? '';
            await userService.verifyUserSessionToken(token);
        } catch (err) {
            localStorage.removeItem("token");
            props.setAuth(false);
        }
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    useEffect(() => {
        fetchVerifyToken();
    }, []);


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
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
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