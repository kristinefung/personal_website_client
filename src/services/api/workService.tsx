const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type Work = {
    id: number;
    title: string;
    companyName: string;
    description: string;
    startMonth: number;
    startYear: number;
    endMonth: number;
    endYear: number;
    isCurrent: number;
    createdAt: Date;
}

const WorkService = () => {
    // const workApi = WorkApi(baseUrl);
    // const tokenStorage = TokenStorage();

    const getAllWorks = async (): Promise<Work[]> => {

        const response = await fetch(`${API_BASE_URL}/works`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const worksResp = await response.json();
        return worksResp.data.works;
    };

    // const getWorkById = async (id: number): Promise<Work> => {
    //     const workResp: ApiResponse<Work> = await workApi.getWorkById(id);
    //     if (workResp.status !== 0) {
    //         throw new Error(workResp.message);
    //     }
    //     return workResp.data;
    // };

    // const updateWorkById = async (id: number, work: Work): Promise<Work> => {
    //     const authToken = await tokenStorage.getAuthToken();
    //     const workResp: ApiResponse<Work> = await workApi.updateWorkById(authToken, id, work);
    //     if (workResp.status !== 0) {
    //         throw new Error(workResp.message);
    //     }
    //     return workResp.data;
    // };

    // const createWork = async (work: Work): Promise<{ data: Work | null; errMsg: string | null }> => {
    //     const authToken = await tokenStorage.getAuthToken();
    //     const workResp: ApiResponse<Work> = await workApi.createWork(authToken, work);
    //     if (workResp.status !== 0) {
    //         return { data: null, errMsg: workResp.message };
    //     }
    //     return { data: workResp.data, errMsg: null };
    // };

    // const deleteWorkById = async (id: number): Promise<Work> => {
    //     const authToken = await tokenStorage.getAuthToken();
    //     const workResp: ApiResponse<Work> = await workApi.deleteWorkById(authToken, id);
    //     if (workResp.status !== 0) {
    //         throw new Error(workResp.message);
    //     }
    //     return workResp.data;
    // };

    return {
        getAllWorks,
        // getWorkById,
        // updateWorkById,
        // createWork,
        // deleteWorkById
    };
};

export default WorkService;