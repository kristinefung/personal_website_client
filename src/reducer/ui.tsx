import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface State {
    successSnackbarOpen: boolean;
    successSnackbarMessage: string;
    errorSnackbarOpen: boolean;
    errorSnackbarMessage: string;
}

const initialState: State = {
    successSnackbarOpen: false,
    successSnackbarMessage: '',
    errorSnackbarOpen: false,
    errorSnackbarMessage: '',
};

export const showSuccessSnackbar = createAsyncThunk(
    'ui/showSuccessSnackbar',
    async (message: string) => {
        console.log("showSuccessSnackbar");
        return message
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
            .addCase(showSuccessSnackbar.fulfilled, (state, action) => {
                state.successSnackbarOpen = true;
                state.successSnackbarMessage = action.payload;
            })
            .addCase(clearSnackbar.fulfilled, (state, action) => {
                state.successSnackbarOpen = false;
            });
    },
});

export default ui.reducer;