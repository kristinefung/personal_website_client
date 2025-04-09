import { create } from 'zustand';
import WorkService, { IWork } from 'src/services/api/workService';

const workService = WorkService();

type State = {
    workLoading: boolean;
    worksLoading: boolean;
    updateWorkLoading: boolean;
    work: IWork | Partial<IWork>;
    works: IWork[] | null;
    workFormId: number | null;
    fetchWorkById: (id: number) => Promise<void>;
    fetchAllWorks: () => Promise<void>;
    fetchUpdateWork: (work: IWork) => Promise<void>;
    fetchCreateWork: (work: IWork) => Promise<void>;
    setWork: (work: IWork) => void;
    clearWork: () => void;
    setWorkFormId: (id: number | null) => void;
}

const useWorkStore = create<State>((set) => ({
    workLoading: false,
    worksLoading: false,
    updateWorkLoading: false,
    work: {
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
        set({ updateWorkLoading: true });
        try {
            const response = await workService.updateWorkById(work.id!, work);
        }
        catch (error: unknown) {
            // TODO
        }
        finally {
            set({ updateWorkLoading: false });
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
    clearWork: () => {
        set({
            work: {
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
        });
    },
    setWorkFormId: (id) => {
        console.log(id);
        set({ workFormId: id });
    },
}));

export default useWorkStore;