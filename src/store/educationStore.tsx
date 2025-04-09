import { create } from 'zustand';
import EducationService, { IEducation } from 'src/services/api/educationService';

const educationService = EducationService();

interface LoadingState {
    isLoadingEducation: boolean;
    isLoadingEducations: boolean;
    isUpdatingEducation: boolean;
    isCreatingEducation: boolean;
}

interface EducationState {
    current: IEducation | Partial<IEducation>;
    list: IEducation[] | null;
}

interface EducationFormState {
    id: number | null;
    action: 'CREATE' | 'UPDATE' | null;
}

const initialLoadingState: LoadingState = {
    isLoadingEducation: false,
    isLoadingEducations: false,
    isUpdatingEducation: false,
    isCreatingEducation: false
};

const initialEducationState: EducationState = {
    current: {},
    list: null
};

const initialFormState: EducationFormState = {
    id: null,
    action: null
};

const useEducationStore = create<EducationState & EducationFormState & LoadingState>((set) => ({
    ...initialEducationState,
    ...initialFormState,
    ...initialLoadingState,
}));

export const educationActions = {
    isLoading: (key: keyof LoadingState) => useEducationStore.getState()[key],

    setCurrentEducation: (education: IEducation | Partial<IEducation>) =>
        useEducationStore.setState({ current: education }),

    clearCurrentEducation: () =>
        useEducationStore.setState({ current: {} }),

    setFormState: (formState: EducationFormState) =>
        useEducationStore.setState(formState),

    fetchEducationById: async (id: number) => {
        useEducationStore.setState({ isLoadingEducation: true });
        try {
            const response = await educationService.getEducationById(id);
            useEducationStore.setState({ current: response });
        }
        catch (error: unknown) {
            // TODO: Handle error properly
            console.error('Error fetching education:', error);
        }
        finally {
            useEducationStore.setState({ isLoadingEducation: false });
        }
    },

    fetchAllEducations: async () => {
        useEducationStore.setState({ isLoadingEducations: true });
        try {
            const response = await educationService.getAllEducations();
            useEducationStore.setState({ list: response });
        }
        catch (error: unknown) {
            // TODO: Handle error properly
            console.error('Error fetching educations:', error);
        }
        finally {
            useEducationStore.setState({ isLoadingEducations: false });
        }
    },

    updateEducation: async (education: IEducation) => {
        useEducationStore.setState({ isUpdatingEducation: true });
        try {
            await educationService.updateEducationById(education.id!, education);
            await educationActions.fetchAllEducations();
        }
        catch (error: unknown) {
            // TODO: Handle error properly
            console.error('Error updating education:', error);
        }
        finally {
            useEducationStore.setState({ isUpdatingEducation: false });
        }
    },

    createEducation: async (education: IEducation) => {
        useEducationStore.setState({ isCreatingEducation: true });
        try {
            await educationService.createEducation(education);
            await educationActions.fetchAllEducations();
        }
        catch (error: unknown) {
            // TODO: Handle error properly
            console.error('Error creating education:', error);
        }
        finally {
            useEducationStore.setState({ isCreatingEducation: false });
        }
    }
};

export default useEducationStore; 