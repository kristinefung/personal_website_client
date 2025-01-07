import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import WorkService, { type Work } from 'src/services/api/workService';

interface State {
    loading: boolean;
    works: Work[];
    error: string;
}

const initialState: State = {
    loading: false,
    works: [],
    error: '',
};

const workService = WorkService();

export const fetchWorks = createAsyncThunk('works/getAllWorks', async () => {
    const response = await workService.getAllWorks();
    return response;
});

const work = createSlice({
    name: 'works',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWorks.fulfilled, (state, action) => {
                state.loading = false;
                state.works = action.payload;
                state.error = '';
            })
            .addCase(fetchWorks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch data';
            });
    },
});

export default work.reducer;