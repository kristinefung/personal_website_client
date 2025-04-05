import React from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import theme from '../../../theme';

interface MenuItemProps {
    icon: React.ReactNode;
    text: string;
    onClick: () => void;
}

interface MoreMenuProps {
    items: MenuItemProps[];
}

const MoreMenu: React.FC<MoreMenuProps> = ({ items }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: theme.palette.primary.dark, // Default to white if no color is provided
                    },
                }}
            >
                {items.map((item, index) => (
                    <MenuItem key={index} onClick={() => {
                        handleClose();
                        item.onClick();
                    }}>
                        {item.icon}
                        {item.text}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default MoreMenu;