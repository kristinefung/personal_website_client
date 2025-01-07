import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import WorkService, { type Work } from 'src/services/api/workService';

interface State {
    loading: boolean;
    data: Work[];
    error: string;
}

const initialState: State = {
    loading: false,
    data: [],
    error: '',
};

const workService = WorkService();

export const getAllWorks = createAsyncThunk('works/getAllWorks', async () => {
    const response = await workService.getAllWorks();
    return response;
});

const work = createSlice({
    name: 'works',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllWorks.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllWorks.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = '';
            })
            .addCase(getAllWorks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch data';
            });
    },
});

export default work.reducer;