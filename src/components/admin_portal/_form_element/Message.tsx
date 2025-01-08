import { useState, useEffect } from 'react';

import Alert, { AlertColor } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

interface MessageProps {
    severity?: AlertColor;
    text: string;
    timeout?: number;
    open?: boolean;
    onClose: () => void;
}

export interface AlertState {
    message: string;
    severity: AlertColor;
    visible: boolean;
}

const Message: React.FC<MessageProps> = ({
    severity = 'success',
    text,
    timeout = 5000,
    open = false,
    onClose,
}) => {

    return (
        <div className='message'>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                autoHideDuration={timeout}
                onClose={onClose}>
                <Alert
                    severity={severity}
                    onClose={onClose}>
                    {text}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Message;