import { create } from 'zustand';
import WorkService, { IWork } from 'src/services/api/workService';

const workService = WorkService();

type State = {
    worksLoading: boolean;
    works: IWork[] | null;
    work: IWork | null;
    setWork: (work: IWork) => void;
    fetchAllWorks: () => Promise<void>;
    fetchUpdateWork: (work: IWork) => void;
}

const useWorkStore = create<State>((set) => ({
    worksLoading: false,
    works: null,
    work: null,
    setWork: (work) => {
        set({ work: work });
    },
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
        set({ worksLoading: true });
        try {
            const response = await workService.updateWorkById(work.id!, work);
        }
        catch (error: unknown) {
            // TODO
        }
        finally {
            set({ worksLoading: false });
        }
    },
}));

export default useWorkStore;