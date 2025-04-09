import { create } from 'zustand';
import WorkService, { IWork } from 'src/services/api/workService';

const workService = WorkService();

interface LoadingState {
    isLoadingWork: boolean;
    isLoadingWorks: boolean;
    isUpdatingWork: boolean;
    isCreatingWork: boolean;
}

interface WorkFormState {
    id: number | null;
    action: 'CREATE' | 'UPDATE' | null;
}

interface WorkState {
    current: IWork | Partial<IWork>;
    list: IWork[] | null;
}

const initialLoadingState: LoadingState = {
    isLoadingWork: false,
    isLoadingWorks: false,
    isUpdatingWork: false,
    isCreatingWork: false
};

const initialWorkState: WorkState = {
    current: {
        id: undefined,
        title: undefined,
        companyName: undefined,
        description: undefined,
        startMonth: undefined,
        startYear: undefined,
        endMonth: undefined,
        endYear: undefined,
        isCurrent: 0,
        createdAt: undefined,
    },
    list: null
};

const initialFormState: WorkFormState = {
    id: null,
    action: null
};

const useWorkStore = create<WorkState & WorkFormState & LoadingState>((set) => ({
    ...initialWorkState,
    ...initialFormState,
    ...initialLoadingState,
}));

export const workActions = {
    setLoading: (key: keyof LoadingState, value: boolean) =>
        useWorkStore.setState((state) => ({
            [key]: value
        })),

    setCurrentWork: (work: IWork) =>
        useWorkStore.setState({ current: work }),

    setWorkList: (works: IWork[]) =>
        useWorkStore.setState({ list: works }),

    clearCurrentWork: () =>
        useWorkStore.setState({ current: initialWorkState.current }),

    setFormState: (state: Partial<WorkFormState>) =>
        useWorkStore.setState((prev) => ({
            ...prev,
            ...state
        })),

    resetFormState: () =>
        useWorkStore.setState({ ...initialFormState }),

    fetchWorkById: async (id: number) => {
        useWorkStore.setState({ isLoadingWork: true });
        try {
            const response = await workService.getWorkById(id);
            useWorkStore.setState({ current: response });
        }
        catch (error: unknown) {
            // TODO: Handle error properly
            console.error('Error fetching work:', error);
        }
        finally {
            useWorkStore.setState({ isLoadingWork: false });
        }
    },

    fetchAllWorks: async () => {
        useWorkStore.setState({ isLoadingWorks: true });
        try {
            const response = await workService.getAllWorks();
            useWorkStore.setState({ list: response });
        }
        catch (error: unknown) {
            // TODO: Handle error properly
            console.error('Error fetching works:', error);
        }
        finally {
            useWorkStore.setState({ isLoadingWorks: false });
        }
    },

    updateWork: async (work: IWork) => {
        useWorkStore.setState({ isUpdatingWork: true });
        try {
            await workService.updateWorkById(work.id!, work);
        }
        catch (error: unknown) {
            // TODO: Handle error properly
            console.error('Error updating work:', error);
        }
        finally {
            useWorkStore.setState({ isUpdatingWork: false });
        }
    },

    createWork: async (work: IWork) => {
        useWorkStore.setState({ isCreatingWork: true });
        try {
            await workService.createWork(work);
        }
        catch (error: unknown) {
            // TODO: Handle error properly
            console.error('Error creating work:', error);
        }
        finally {
            useWorkStore.setState({ isCreatingWork: false });
        }
    }
};

export default useWorkStore;