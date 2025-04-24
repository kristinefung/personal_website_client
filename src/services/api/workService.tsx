const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Base response type
interface BaseResponse {
    statusCode: string;
    traceId: string;
    message: string;
}

// Work interface
export interface IWork {
    id?: number;
    title?: string;
    companyName?: string;
    description?: string;
    startMonth?: number;
    startYear?: number;
    endMonth?: number;
    endYear?: number;
    isCurrent?: boolean;
    createdAt?: Date;
}

// Request and Response types for each endpoint
interface GetAllWorksRequest {
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
}

interface GetAllWorksResponse extends BaseResponse {
    data: {
        works: IWork[];
        total: number;
    };
}

interface GetWorkByIdResponse extends BaseResponse {
    data: {
        work: IWork;
    };
}

interface CreateWorkRequest {
    title: string;
    companyName: string;
    description: string;
    startMonth: number;
    startYear: number;
    endMonth: number;
    endYear: number;
    isCurrent: boolean;
}

interface CreateWorkResponse extends BaseResponse {
    data: {
        id: number;
    };
}

interface UpdateWorkRequest {
    title?: string;
    companyName?: string;
    description?: string;
    startMonth?: number;
    startYear?: number;
    endMonth?: number;
    endYear?: number;
    isCurrent?: boolean;
}

interface UpdateWorkResponse extends BaseResponse {
    data: {
        work: IWork;
    };
}

interface DeleteWorkResponse extends BaseResponse {
    data: Record<string, never>;
}

export type WorkError = {
    title?: string;
    companyName?: string;
    description?: string;
    startMonth?: string;
    startYear?: string;
    endMonth?: string;
    endYear?: string;
    isCurrent?: string;
}

const WorkService = () => {
    // const workApi = WorkApi(baseUrl);
    // const tokenStorage = TokenStorage();

    const getAllWorks = async (params?: GetAllWorksRequest): Promise<GetAllWorksResponse> => {
        const queryParams = new URLSearchParams();
        if (params?.orderBy) queryParams.append('orderBy', params.orderBy);
        if (params?.orderDirection) queryParams.append('orderDirection', params.orderDirection);

        const response = await fetch(`${API_BASE_URL}/works?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        return await response.json();
    };

    const getWorkById = async (id: number): Promise<GetWorkByIdResponse> => {
        const response = await fetch(`${API_BASE_URL}/works/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        return await response.json();
    };

    const updateWorkById = async (id: number, work: UpdateWorkRequest): Promise<UpdateWorkResponse> => {
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

        return await response.json();
    };

    const createWork = async (work: CreateWorkRequest): Promise<CreateWorkResponse> => {
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

        return await response.json();
    };

    const deleteWorkById = async (id: number): Promise<DeleteWorkResponse> => {
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

        return await response.json();
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