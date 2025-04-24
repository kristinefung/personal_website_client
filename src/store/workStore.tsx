import { makeAutoObservable, runInAction } from 'mobx';
import WorkService, { IWork, WorkError } from '../services/api/workService';

class WorkStore {
    works: IWork[] = [];
    currentWork: IWork | null = null;
    loading: boolean = false;
    error: WorkError | null = null;
    total: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    // Actions
    setWorks = (works: IWork[]) => {
        this.works = works;
    };

    setCurrentWork = (work: IWork | null) => {
        this.currentWork = work;
    };

    setLoading = (loading: boolean) => {
        this.loading = loading;
    };

    setError = (error: WorkError | null) => {
        this.error = error;
    };

    setTotal = (total: number) => {
        this.total = total;
    };

    // Async actions
    fetchWorks = async (orderBy?: string, orderDirection?: 'asc' | 'desc') => {
        try {
            this.setLoading(true);
            this.setError(null);
            const workService = WorkService();
            const response = await workService.getAllWorks({ orderBy, orderDirection });
            runInAction(() => {
                this.setWorks(response.data.works);
                this.setTotal(response.data.total);
            });
        } catch (error) {
            runInAction(() => {
                this.setError({ title: 'Failed to fetch works' });
            });
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
        }
    };

    fetchWorkById = async (id: number) => {
        try {
            this.setLoading(true);
            this.setError(null);
            const workService = WorkService();
            const response = await workService.getWorkById(id);
            runInAction(() => {
                this.setCurrentWork(response.data.work);
            });
        } catch (error) {
            runInAction(() => {
                this.setError({ title: 'Failed to fetch work' });
            });
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
        }
    };

    createWork = async (work: Omit<IWork, 'id' | 'createdAt'>) => {
        try {
            this.setLoading(true);
            this.setError(null);
            const workService = WorkService();
            await workService.createWork(work as any);
            await this.fetchWorks();
        } catch (error) {
            runInAction(() => {
                this.setError({ title: 'Failed to create work' });
            });
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
        }
    };

    updateWork = async (id: number, work: Partial<IWork>) => {
        try {
            this.setLoading(true);
            this.setError(null);
            const workService = WorkService();
            await workService.updateWorkById(id, work as any);
            await this.fetchWorks();
        } catch (error) {
            runInAction(() => {
                this.setError({ title: 'Failed to update work' });
            });
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
        }
    };

    deleteWork = async (id: number) => {
        try {
            this.setLoading(true);
            this.setError(null);
            const workService = WorkService();
            await workService.deleteWorkById(id);
            await this.fetchWorks();
        } catch (error) {
            runInAction(() => {
                this.setError({ title: 'Failed to delete work' });
            });
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
        }
    };
}

export const workStore = new WorkStore();
export default workStore; 