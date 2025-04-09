import React from 'react';
import { getRandomString } from 'src/utils/common';

import TextField from '@mui/material/TextField';

// Define the props interface
interface TextareaProps {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    errorMsg?: string;
    isDisabled?: boolean;
    flex?: number;
}
const Textarea: React.FC<TextareaProps> = ({
    label,
    value,
    onChange,
    errorMsg = "",
    isDisabled = false,
    flex = 1,
}) => {
    const id = 'textarea-' + getRandomString(10);

    return (
        <>
            <TextField
                id="outlined-multiline-flexible"
                label={label}
                defaultValue={value}
                disabled={isDisabled}
                error={(errorMsg !== undefined && errorMsg.length !== 0)}
                helperText={(errorMsg !== undefined && errorMsg.length !== 0) ? errorMsg : " "}
                onChange={onChange}
                multiline
                minRows={6}
                maxRows={6}
                sx={{ flex: flex }}
            />
        </>
    );
}

export default Textarea;