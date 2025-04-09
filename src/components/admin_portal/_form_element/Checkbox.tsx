import React from 'react';
import { getRandomString } from 'src/utils/common';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import MuiCheckbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import adminTheme from 'src/theme';

// Define the props interface
interface CheckboxProps {
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    errorMsg?: string;
    isChecked?: boolean;
    required?: boolean
}
const Checkbox: React.FC<CheckboxProps> = ({
    label,
    onChange,
    errorMsg,
    isChecked = false,
    required = false,
}) => {
    const id = 'Checkbox-' + getRandomString(10);

    return (
        <>
            <FormControl
                required
                error={(errorMsg !== undefined && errorMsg.length !== 0)}
            >
                <FormControlLabel
                    required={required}
                    control={<MuiCheckbox
                        checked={isChecked}
                        onChange={onChange}
                        sx={{
                            '&.Mui-checked': {
                                color: adminTheme.palette.secondary.main,
                            },
                        }}
                    />}
                    label={label}
                />
                <FormHelperText>{(errorMsg !== undefined && errorMsg.length !== 0) ? errorMsg : " "}</FormHelperText>
            </FormControl>
        </>
    );
}

export default Checkbox;