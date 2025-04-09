import { create } from 'zustand';
import { AlertColor } from '@mui/material/Alert';
type State = {
    open: boolean,
    severity: AlertColor,
    message: string,
    showSnackbar: (severity: AlertColor, message: string) => void;
    clearSnackbar: () => void;
}

const useUiStore = create<State>((set) => ({
    open: false,
    severity: 'success',
    message: '',
    showSnackbar: (severity, message) => {
        set({
            severity: severity,
            message: message,
            open: true,
        })
    },
    clearSnackbar: () => {
        set({
            severity: 'success',
            message: '',
            open: false,
        })
    }
}));

export default useUiStore;