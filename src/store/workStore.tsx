import { create } from 'zustand';
import WorkService, { IWork } from 'src/services/api/workService';

const workService = WorkService();

type State = {
    allWorksLoading: boolean;
    allWorks: IWork[] | null;
    setAllWorks: () => Promise<void>;
}

const useWorkStore = create<State>((set) => ({
    allWorksLoading: false,
    allWorks: null,
    setAllWorks: async () => {
        set({ allWorksLoading: true });
        try {
            const response = await workService.getAllWorks();
            set({ allWorks: response });
        }
        catch (error: unknown) {
            // TODO
        }
        finally {
            set({ allWorksLoading: false });
        }
    },
}));

export default useWorkStore;