import React from 'react';
import { getRandomString } from 'src/utils/common';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

// Define the props interface
interface DropdownListProps {
    label: string;
    value: string;
    options: {
        label: string;
        value: number;
    }[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    errorMsg?: string;
    isDisabled?: boolean;
    flex?: number;
}
const DropdownList: React.FC<DropdownListProps> = ({
    label,
    value,
    options,
    onChange,
    errorMsg,
    isDisabled = false,
    flex = 1,
}) => {
    const id = 'dropdownlist-' + getRandomString(10);

    return (
        <>
            <TextField
                id={id}
                select
                label={label}
                defaultValue={value}
                error={(errorMsg !== undefined && errorMsg.length !== 0)}
                helperText={errorMsg}
                sx={{ flex: flex }}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </>
    );
}

export default DropdownList;