import React from 'react';
import { useNavigate } from "react-router-dom";

import { Drawer as MuiDrawer, List, ListSubheader, ListItem, ListItemButton, ListItemText, Box, Typography } from '@mui/material';

import theme from '../../../theme';
const drawerWidth = 220;


const navItems = [
    {
        displayName: "Profile",
        path: "/dashboard/profile",
    },
    {
        displayName: "Enquiry",
        path: "/dashboard/enquiry",
    }
]


interface DrawerProps {
    mobileOpen: boolean
    handleDrawerTransitionEnd: () => void
    handleDrawerClose: () => void
}

const Drawer: React.FC<DrawerProps> = (props) => {
    const navigate = useNavigate();

    const handleOnClickNavItem = (path: string) => {
        navigate(path);
        props.handleDrawerClose();
    }

    const drawer = (
        <div>
            {
                <>
                    <Typography
                        onClick={() => handleOnClickNavItem('/dashboard')}
                        variant="h5"
                        component="h5"
                        sx={{ mt: 2, ml: 3, cursor: 'pointer', color: theme.palette.secondary.light }} >
                        Dashboard
                    </Typography>

                    <List sx={{ ml: 1 }}>
                        {navItems.map((navItem) => (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => handleOnClickNavItem(navItem.path)}>
                                        <ListItemText primary={navItem.displayName} />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        ))}
                    </List>
                </>

            }

        </div>
    );

    return (

        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="nav"
        >
            <MuiDrawer
                variant="temporary"
                open={props.mobileOpen}
                onTransitionEnd={props.handleDrawerTransitionEnd}
                onClose={props.handleDrawerClose}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        backgroundColor: theme.palette.background.default,
                        boxSizing: 'border-box',
                        width: drawerWidth
                    },
                }}
                slotProps={{
                    root: {
                        keepMounted: true, // Better open performance on mobile.
                    },
                }}
            >
                {drawer}
            </MuiDrawer>
            <MuiDrawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        borderColor: theme.palette.primary.light,
                        backgroundColor: theme.palette.background.default,
                        boxSizing: 'border-box',
                        width: drawerWidth
                    },
                }}
                open
            >
                {drawer}
            </MuiDrawer>
        </Box>
    );
}

export default Drawer;