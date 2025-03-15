import { create } from 'zustand';
import WorkService, { IWork } from 'src/services/api/workService';

const workService = WorkService();

type State = {
    worksLoading: boolean;
    workFormLoading: boolean;
    works: IWork[] | null;
    fetchAllWorks: () => Promise<void>;
    fetchUpdateWork: (work: IWork) => void;
    fetchCreateWork: (work: IWork) => void;
}

const useWorkStore = create<State>((set) => ({
    worksLoading: false,
    workFormLoading: false,
    works: null,
    fetchAllWorks: async () => {
        set({ worksLoading: true });
        try {
            const response = await workService.getAllWorks();
            set({ works: response });
        }
        catch (error: unknown) {
            // TODO
        }
        finally {
            set({ worksLoading: false });
        }
    },
    fetchUpdateWork: async (work) => {
        // set({ worksLoading: true });
        try {
            const response = await workService.updateWorkById(work.id!, work);
        }
        catch (error: unknown) {
            // TODO
        }
        finally {
            // set({ worksLoading: false });
        }
    },
    fetchCreateWork: async (work) => {
        // set({ worksLoading: true });
        try {
            const response = await workService.createWork(work);
        }
        catch (error: unknown) {
            // TODO
        }
        finally {
            // set({ worksLoading: false });
        }
    },
}));

export default useWorkStore;