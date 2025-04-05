import { create } from 'zustand';
import WorkService, { IWork } from 'src/services/api/workService';

const workService = WorkService();

type State = {
    workLoading: boolean;
    worksLoading: boolean;
    work: IWork | null;
    works: IWork[] | null;
    workFormId: number | null;
    fetchWorkById: (id: number) => Promise<void>;
    fetchAllWorks: () => Promise<void>;
    fetchUpdateWork: (work: IWork) => Promise<void>;
    fetchCreateWork: (work: IWork) => Promise<void>;
    setWork: (work: IWork) => void;
    setWorkFormId: (id: number | null) => void;
}

const useWorkStore = create<State>((set) => ({
    workLoading: false,
    worksLoading: false,
    work: null,
    works: null,
    workFormId: null,
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
    fetchWorkById: async (id: number) => {
        set({ workLoading: true });
        try {
            const response = await workService.getWorkById(id);
            set({ work: response });
        }
        catch (error: unknown) {
            // TODO
        }
        finally {
            set({ workLoading: false });
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
    setWork: (work) => {
        set({ work: work });
    },
    setWorkFormId: (id) => {
        console.log(id);
        set({ workFormId: id });
    },
}));

export default useWorkStore;