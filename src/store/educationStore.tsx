import { create } from 'zustand';
import EducationService, { IEducation } from 'src/services/api/educationService';

const educationService = EducationService();

interface LoadingState {
    isLoadingEducations: boolean;
}

interface EducationState {
    list: IEducation[] | null;
}

// Initial states
const initialLoadingState: LoadingState = {
    isLoadingEducations: false
};

const initialEducationState: EducationState = {
    list: null
};

// Create the store with proper type separation
const useEducationStore = create<EducationState & LoadingState>((set) => ({
    // Initial states
    ...initialEducationState,
    ...initialLoadingState,
}));

// Actions
export const educationActions = {
    // Loading state checks
    isLoading: (key: keyof LoadingState) => useEducationStore.getState()[key],

    // Async actions
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
    }
};

export default useEducationStore; 