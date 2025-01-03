import { createTheme } from '@mui/material/styles';

const adminTheme = createTheme({
    palette: {
        primary: {
            main: '#37373f',
        },
        secondary: {
            main: '#ffce24',
        },
        error: {
            main: '#f44336',
        },
        background: {
            default: '#242528',
        },
    },
});

export default adminTheme;