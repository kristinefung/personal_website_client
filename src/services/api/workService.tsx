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

    const getWorkById = async (id: number): Promise<Work> => {

        const response = await fetch(`${API_BASE_URL}/works/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const worksResp = await response.json();
        return worksResp.data.work;
    };

    const updateWorkById = async (id: number, work: Work): Promise<void> => {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_BASE_URL}/works/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(work),
        });


        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        return;
    };

    const createWork = async (work: Work): Promise<Work> => {

        const token = localStorage.getItem("token");

        const response = await fetch(`${API_BASE_URL}/works`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(work),
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const worksResp = await response.json();
        return worksResp.data.work;
    };

    const deleteWorkById = async (id: number): Promise<void> => {

        const token = localStorage.getItem("token");

        const response = await fetch(`${API_BASE_URL}/works/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        return;
    };

    return {
        getAllWorks,
        getWorkById,
        updateWorkById,
        createWork,
        deleteWorkById
    };
};

export default WorkService;