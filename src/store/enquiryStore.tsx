import { makeAutoObservable, runInAction } from 'mobx';
import EnquiryService, { IEnquiry, EnquiryError } from '../services/api/enquiryService';

class EnquiryStore {
    enquiries: IEnquiry[] = [];
    currentEnquiry: IEnquiry | null = null;
    loading: boolean = false;
    error: EnquiryError | null = null;
    total: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    // Actions
    setEnquiries = (enquiries: IEnquiry[]) => {
        this.enquiries = enquiries;
    };

    setCurrentEnquiry = (enquiry: IEnquiry | null) => {
        this.currentEnquiry = enquiry;
    };

    setLoading = (loading: boolean) => {
        this.loading = loading;
    };

    setError = (error: EnquiryError | null) => {
        this.error = error;
    };

    setTotal = (total: number) => {
        this.total = total;
    };

    // Async actions
    fetchEnquiries = async (orderBy?: string, orderDirection?: 'asc' | 'desc') => {
        try {
            this.setLoading(true);
            this.setError(null);
            const enquiryService = EnquiryService();
            const response = await enquiryService.getAllEnquiries({ orderBy, orderDirection });
            runInAction(() => {
                this.setEnquiries(response.data.enquiries);
                this.setTotal(response.data.total);
            });
        } catch (error) {
            runInAction(() => {
                this.setError({ name: 'Failed to fetch enquiries' });
            });
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
        }
    };

    fetchEnquiryById = async (id: number) => {
        try {
            this.setLoading(true);
            this.setError(null);
            const enquiryService = EnquiryService();
            const response = await enquiryService.getEnquiryById(id);
            runInAction(() => {
                this.setCurrentEnquiry(response.data.enquiry);
            });
        } catch (error) {
            runInAction(() => {
                this.setError({ name: 'Failed to fetch enquiry' });
            });
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
        }
    };

    createEnquiry = async (enquiry: Omit<IEnquiry, 'id' | 'createdAt'>) => {
        try {
            this.setLoading(true);
            this.setError(null);
            const enquiryService = EnquiryService();
            await enquiryService.createEnquiry(enquiry as any);
            await this.fetchEnquiries();
        } catch (error) {
            runInAction(() => {
                this.setError({ name: 'Failed to create enquiry' });
            });
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
        }
    };

    updateEnquiry = async (id: number, enquiry: Partial<IEnquiry>) => {
        try {
            this.setLoading(true);
            this.setError(null);
            const enquiryService = EnquiryService();
            await enquiryService.updateEnquiryById(id, enquiry as any);
            await this.fetchEnquiries();
        } catch (error) {
            runInAction(() => {
                this.setError({ name: 'Failed to update enquiry' });
            });
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
        }
    };

    deleteEnquiry = async (id: number) => {
        try {
            this.setLoading(true);
            this.setError(null);
            const enquiryService = EnquiryService();
            await enquiryService.deleteEnquiryById(id);
            await this.fetchEnquiries();
        } catch (error) {
            runInAction(() => {
                this.setError({ name: 'Failed to delete enquiry' });
            });
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
        }
    };
}

export const enquiryStore = new EnquiryStore();
export default enquiryStore; 