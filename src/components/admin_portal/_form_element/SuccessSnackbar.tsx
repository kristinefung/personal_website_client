import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'src/store';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { clearSnackbar } from 'src/reducer/ui';

interface SuccessSnackbarProps {
}

const SuccessSnackbar: React.FC<SuccessSnackbarProps> = ({
}) => {
    const { successSnackbarOpen, successSnackbarMessage } = useSelector((state: RootState) => state.ui);

    const dispatch = useDispatch<AppDispatch>();
    const handleSuccessSnackbarClose = () => {
        dispatch(clearSnackbar());
    };

    return (
        <>
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
        </>
    );
}

export default SuccessSnackbar;