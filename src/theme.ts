import { createTheme } from '@mui/material/styles';

const adminTheme = createTheme({
    palette: {
        primary: {
            main: '#37373f',
            contrastText: '#FFF',
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
        text: {
            primary: '#FFF',
            secondary: '#FFF',
            disabled: '#bdbdbd',
        },
    },
    components: {
        MuiFormControl: {
            defaultProps: {
                size: "small",
            },
            styleOverrides: {
                root: {
                    margin: '5px 0px 0px 0px',
                }
            }
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    padding: '0px 9px', // Adjust padding as needed
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    color: '#fff',
                    backgroundColor: '#343434',
                    // '&.Mui-disabled': {
                    //   backgroundColor: '#e4e4e4',
                    // },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-notchedOutline": {
                        border: `1px solid #c4c4c4`,
                    },
                    "&.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: `1px solid #c4c4c4`,
                        },
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: `1px solid #c4c4c4`,
                    },

                },
            }
        },
        MuiInputLabel: {
            defaultProps: {
                sx: {
                    fontSize: "13px",
                    top: 2,
                },
            },
            styleOverrides: {
                shrink: ({ ownerState, theme }) => ({
                    ...(ownerState.shrink && {
                        fontSize: "1rem !important",
                        top: "-1 !important",
                    }),
                }),
                root: {
                    color: '#d4d4d4',
                    "&.Mui-focused": {
                        color: '#d4d4d4',
                    }
                }
            },
        },
        MuiList: {
            styleOverrides: {
                root: {
                    backgroundColor: '#242528'
                }
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#37373f', // Change color on hover
                    },
                    "&.Mui-selected": {
                        backgroundColor: "#37373f",
                        "&:hover": {
                            backgroundColor: "#37373f"
                        }
                    }
                }
            },
        },
    },
});

export default adminTheme;