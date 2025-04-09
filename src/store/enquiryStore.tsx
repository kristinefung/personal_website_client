import { create } from 'zustand';
import EnquiryService, { IEnquiry } from 'src/services/api/enquiryService';

const enquiryService = EnquiryService();

interface LoadingState {
    isLoadingEnquiry: boolean;
    isLoadingEnquiries: boolean;
    isUpdatingEnquiry: boolean;
    isCreatingEnquiry: boolean;
}

interface EnquiryState {
    current: Partial<IEnquiry>;
    list: IEnquiry[] | null;
}

interface EnquiryFormState {
    id: number | null;
    action: "UPDATE" | "CREATE" | null;
}

const initialLoadingState: LoadingState = {
    isLoadingEnquiry: false,
    isLoadingEnquiries: false,
    isUpdatingEnquiry: false,
    isCreatingEnquiry: false
};

const initialEnquiryState: EnquiryState = {
    current: {},
    list: null
};

const initialFormState: EnquiryFormState = {
    id: null,
    action: null
};

const useEnquiryStore = create<EnquiryState & EnquiryFormState & LoadingState>((set) => ({
    ...initialEnquiryState,
    ...initialFormState,
    ...initialLoadingState,
}));

export const enquiryActions = {
    isLoading: (key: keyof LoadingState) => useEnquiryStore.getState()[key],

    setCurrentEnquiry: (enquiry: IEnquiry | Partial<IEnquiry>) =>
        useEnquiryStore.setState({ current: enquiry }),

    clearCurrentEnquiry: () =>
        useEnquiryStore.setState({ current: {} }),

    setFormState: (formState: EnquiryFormState) =>
        useEnquiryStore.setState(formState),

    fetchEnquiryById: async (id: number) => {
        useEnquiryStore.setState({ isLoadingEnquiry: true });
        try {
            const response = await enquiryService.getEnquiryById(id);
            useEnquiryStore.setState({ current: response });
        }
        catch (error: unknown) {
            // TODO: Handle error properly
            console.error('Error fetching enquiry:', error);
        }
        finally {
            useEnquiryStore.setState({ isLoadingEnquiry: false });
        }
    },

    fetchAllEnquiries: async () => {
        useEnquiryStore.setState({ isLoadingEnquiries: true });
        try {
            const response = await enquiryService.getAllEnquiries();
            useEnquiryStore.setState({ list: response });
        }
        catch (error: unknown) {
            // TODO: Handle error properly
            console.error('Error fetching enquiries:', error);
        }
        finally {
            useEnquiryStore.setState({ isLoadingEnquiries: false });
        }
    },

    updateEnquiry: async (enquiry: IEnquiry) => {
        useEnquiryStore.setState({ isUpdatingEnquiry: true });
        try {
            await enquiryService.updateEnquiryById(enquiry.id!, enquiry);
            await enquiryActions.fetchAllEnquiries();
        }
        catch (error: unknown) {
            // TODO: Handle error properly
            console.error('Error updating enquiry:', error);
        }
        finally {
            useEnquiryStore.setState({ isUpdatingEnquiry: false });
        }
    },

    createEnquiry: async (enquiry: IEnquiry) => {
        useEnquiryStore.setState({ isCreatingEnquiry: true });
        try {
            await enquiryService.createEnquiry(enquiry);
            await enquiryActions.fetchAllEnquiries();
        }
        catch (error: unknown) {
            // TODO: Handle error properly
            console.error('Error creating enquiry:', error);
        }
        finally {
            useEnquiryStore.setState({ isCreatingEnquiry: false });
        }
    },

    deleteEnquiry: async (id: number) => {
        try {
            await enquiryService.deleteEnquiryById(id);
            await enquiryActions.fetchAllEnquiries();
        }
        catch (error: unknown) {
            // TODO: Handle error properly
            console.error('Error deleting enquiry:', error);
        }
    }
};

export default useEnquiryStore; 