import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import WorkService, { type Work } from 'src/services/api/workService';

const workService = WorkService();

interface State {
    loading: boolean;
    works: Work[];
    success: boolean;
    error: string;
}

const initialState: State = {
    loading: false,
    works: [],
    success: false,
    error: '',
};

export const fetchGetAllWorks = createAsyncThunk('works/getAllWorks', async () => {
    const response = await workService.getAllWorks();
    return response;
});

const getAllWorks = createSlice({
    name: 'works',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetAllWorks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchGetAllWorks.fulfilled, (state, action) => {
                state.loading = false;
                state.works = action.payload;
                state.success = true;
                state.error = '';
            })
            .addCase(fetchGetAllWorks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch data';
            });
    },
});

export default getAllWorks.reducer;
