import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'src/store';

import Alert, { AlertColor } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { clearSnackbar, showSuccessSnackbar } from 'src/reducer/ui';

interface SuccessSnackbarProps {
}

export interface AlertState {
    SuccessSnackbar: string;
    severity: AlertColor;
    visible: boolean;
}

const SuccessSnackbar: React.FC<SuccessSnackbarProps> = ({
}) => {
    const { successSnackbarOpen, successSnackbarMessage } = useSelector((state: RootState) => state.ui);

    console.log(successSnackbarOpen);

    const dispatch = useDispatch<AppDispatch>();
    const handleSuccessSnackbarClose = () => {
        dispatch(clearSnackbar());
    };
    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={successSnackbarOpen}
                autoHideDuration={5000}
                onClose={handleSuccessSnackbarClose}>
                <Alert
                    severity="success"
                    onClose={handleSuccessSnackbarClose}>
                    {successSnackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default SuccessSnackbar;