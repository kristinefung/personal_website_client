import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'src/store';

import Alert from '@mui/material/Alert';
import { Snackbar as MuiSnackbar } from '@mui/material';
import { clearSnackbar } from 'src/reducer/ui';

import useUiStore from 'src/store/uiStore';

interface SnackbarProps {
}

const Snackbar: React.FC<SnackbarProps> = ({
}) => {
    const { open, severity, message, clearSnackbar } = useUiStore();

    const handleSnackbarClose = () => {
        clearSnackbar();
    };

    return (
        <>
            <MuiSnackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}>
                <Alert
                    severity={severity}
                    onClose={handleSnackbarClose}>
                    {message}
                </Alert>
            </MuiSnackbar>
        </>
    );
}

export default Snackbar;