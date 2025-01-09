import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import WorkService, { type Work } from 'src/services/api/workService';

const workService = WorkService();

interface State {
    loading: boolean;
    success: boolean;
    error: string;
}

const initialState: State = {
    loading: false,
    success: false,
    error: '',
};

interface UpdateParams {
    work: Work;
    id: number;
}

interface CreateParams {
    work: Work;
}

export const fetchUpdateWork = createAsyncThunk('works/updateWork', async (params: UpdateParams) => {
    await workService.updateWorkById(params.id, params.work);
});

export const fetchCreateWork = createAsyncThunk('works/createWork', async (params: CreateParams) => {
    await workService.createWork(params.work);
});

const createOrUpdateWork = createSlice({
    name: 'works',
    initialState,
    reducers: {
        resetWorksState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            // Update work
            .addCase(fetchUpdateWork.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUpdateWork.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = '';
            })
            .addCase(fetchUpdateWork.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch data';
            })
            // Create work
            .addCase(fetchCreateWork.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCreateWork.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = '';
            })
            .addCase(fetchCreateWork.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message || 'Failed to fetch data',
                }
            });
    },
});

export const { resetWorksState } = createOrUpdateWork.actions;
export default createOrUpdateWork.reducer;
