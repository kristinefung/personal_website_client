import { makeAutoObservable, runInAction } from 'mobx';
import EducationService, { IEducation, EducationError } from '../services/api/educationService';

class EducationStore {
    educations: IEducation[] = [];
    currentEducation: IEducation | null = null;
    loading: boolean = false;
    error: EducationError | null = null;
    total: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    // Actions
    setEducations = (educations: IEducation[]) => {
        this.educations = educations;
    };

    setCurrentEducation = (education: Partial<IEducation> | null) => {
        if (education === null) {
            this.currentEducation = null;
        } else {
            this.currentEducation = { ...this.currentEducation, ...education } as IEducation;
        }
    };

    setLoading = (loading: boolean) => {
        this.loading = loading;
    };

    setError = (error: EducationError | null) => {
        this.error = error;
    };

    setTotal = (total: number) => {
        this.total = total;
    };

    // Async actions
    fetchEducations = async (orderBy?: string, orderDirection?: 'asc' | 'desc') => {
        try {
            this.setLoading(true);
            this.setError(null);
            const educationService = EducationService();
            const response = await educationService.getAllEducations({ orderBy, orderDirection });
            runInAction(() => {
                this.setEducations(response.data.educations);
                this.setTotal(response.data.total);
            });
        } catch (error) {
            runInAction(() => {
                this.setError({ degree: 'Failed to fetch educations' });
            });
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
        }
    };

    fetchEducationById = async (id: number) => {
        try {
            this.setLoading(true);
            this.setError(null);
            const educationService = EducationService();
            const response = await educationService.getEducationById(id);
            runInAction(() => {
                this.setCurrentEducation(response.data.education);
            });
        } catch (error) {
            runInAction(() => {
                this.setError({ degree: 'Failed to fetch education' });
            });
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
        }
    };

    createEducation = async (education: Omit<IEducation, 'id' | 'createdAt'>) => {
        try {
            this.setLoading(true);
            this.setError(null);
            const educationService = EducationService();
            await educationService.createEducation(education as any);
            await this.fetchEducations();
        } catch (error) {
            runInAction(() => {
                this.setError({ degree: 'Failed to create education' });
            });
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
        }
    };

    updateEducation = async (id: number, education: Partial<IEducation>) => {
        try {
            this.setLoading(true);
            this.setError(null);
            const educationService = EducationService();
            await educationService.updateEducationById(id, education as any);
            await this.fetchEducations();
        } catch (error) {
            runInAction(() => {
                this.setError({ degree: 'Failed to update education' });
            });
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
        }
    };

    deleteEducation = async (id: number) => {
        try {
            this.setLoading(true);
            this.setError(null);
            const educationService = EducationService();
            await educationService.deleteEducationById(id);
            await this.fetchEducations();
        } catch (error) {
            runInAction(() => {
                this.setError({ degree: 'Failed to delete education' });
            });
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
        }
    };
}

export const educationStore = new EducationStore();
export default educationStore; 