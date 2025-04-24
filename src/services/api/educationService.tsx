const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Base response type
interface BaseResponse {
    statusCode: string;
    traceId: string;
    message: string;
}

// Education interface
export interface IEducation {
    id?: number;
    degree: string;
    subject: string;
    schoolName: string;
    description: string;
    startMonth: number;
    startYear: number;
    endMonth: number;
    endYear: number;
    isCurrent: boolean;
    createdAt?: Date;
}

// Request and Response types for each endpoint
interface GetAllEducationsRequest {
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
}

interface GetAllEducationsResponse extends BaseResponse {
    data: {
        educations: IEducation[];
        total: number;
    };
}

interface GetEducationByIdResponse extends BaseResponse {
    data: {
        education: IEducation;
    };
}

interface CreateEducationRequest {
    degree: string;
    subject: string;
    schoolName: string;
    description: string;
    startMonth: number;
    startYear: number;
    endMonth: number;
    endYear: number;
    isCurrent: boolean;
}

interface CreateEducationResponse extends BaseResponse {
    data: {
        id: number;
    };
}

interface UpdateEducationRequest {
    degree?: string;
    subject?: string;
    schoolName?: string;
    description?: string;
    startMonth?: number;
    startYear?: number;
    endMonth?: number;
    endYear?: number;
    isCurrent?: boolean;
}

interface UpdateEducationResponse extends BaseResponse {
    data: {
        education: IEducation;
    };
}

interface DeleteEducationResponse extends BaseResponse {
    data: Record<string, never>;
}

export type EducationError = {
    degree?: string;
    subject?: string;
    schoolName?: string;
    description?: string;
    startMonth?: string;
    startYear?: string;
    endMonth?: string;
    endYear?: string;
    isCurrent?: string;
}

const EducationService = () => {
    const getAllEducations = async (params?: GetAllEducationsRequest): Promise<GetAllEducationsResponse> => {
        const queryParams = new URLSearchParams();
        if (params?.orderBy) queryParams.append('orderBy', params.orderBy);
        if (params?.orderDirection) queryParams.append('orderDirection', params.orderDirection);

        const response = await fetch(`${API_BASE_URL}/educations?${queryParams.toString()}`, {
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

    const getEducationById = async (id: number): Promise<GetEducationByIdResponse> => {
        const response = await fetch(`${API_BASE_URL}/educations/${id}`, {
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

    const updateEducationById = async (id: number, education: UpdateEducationRequest): Promise<UpdateEducationResponse> => {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_BASE_URL}/educations/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(education),
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        return await response.json();
    };

    const createEducation = async (education: CreateEducationRequest): Promise<CreateEducationResponse> => {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_BASE_URL}/educations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(education),
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        return await response.json();
    };

    const deleteEducationById = async (id: number): Promise<DeleteEducationResponse> => {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_BASE_URL}/educations/${id}`, {
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
        getAllEducations,
        getEducationById,
        updateEducationById,
        createEducation,
        deleteEducationById
    };
};

export default EducationService;