import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { AlertColor } from '@mui/material/Alert';

interface State {
    open: boolean;
    severity: AlertColor;
    message: string;
}

const initialState: State = {
    open: false,
    severity: 'success',
    message: '',
};

interface SnackbarProps {
    severity: AlertColor;
    message: string;
}

export const showSnackbar = createAsyncThunk(
    'ui/showSnackbar',
    async (snackbarProps: SnackbarProps) => {
        return snackbarProps;
    });

export const clearSnackbar = createAsyncThunk(
    'ui/clearSnackbar',
    async () => { });

const ui = createSlice({
    name: 'ui',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(showSnackbar.fulfilled, (state, action) => {
                state.open = true;
                state.severity = action.payload.severity;
                state.message = action.payload.message;
            })
            .addCase(clearSnackbar.fulfilled, (state, action) => {
                state.open = false;
            });
    },
});

export default ui.reducer;