import { useState } from 'react';

import { IconButton, Button, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface MoreOptionButtonProps {
    options: {
        name: string,
        onClick: () => void,
    }[]
}

const MoreOptionButton: React.FC<MoreOptionButtonProps> = ({ options }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='more-option-button'>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                aria-label="More options" style={{ color: '#FFFFFF' }}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                    options.map((option, i) => (
                        <MenuItem key={i} onClick={() => {
                            handleClose();
                            option.onClick();
                        }}>
                            {option.name}
                        </MenuItem>
                    ))
                }
            </Menu>
        </div>
    );
}

export default MoreOptionButton;