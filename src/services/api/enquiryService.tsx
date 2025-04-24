const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Base response type
interface BaseResponse {
    statusCode: string;
    traceId: string;
    message: string;
}

// Enquiry interface
export interface IEnquiry {
    id?: number;
    name: string;
    email: string;
    companyName?: string;
    phoneNo?: string;
    comment: string;
    createdAt?: Date;
}

// Request and Response types for each endpoint
interface GetAllEnquiriesRequest {
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
}

interface GetAllEnquiriesResponse extends BaseResponse {
    data: {
        enquiries: IEnquiry[];
        total: number;
    };
}

interface GetEnquiryByIdResponse extends BaseResponse {
    data: {
        enquiry: IEnquiry;
    };
}

interface CreateEnquiryRequest {
    name: string;
    email: string;
    companyName?: string;
    phoneNo?: string;
    comment: string;
}

interface CreateEnquiryResponse extends BaseResponse {
    data: {
        id: number;
    };
}

interface UpdateEnquiryRequest {
    name?: string;
    email?: string;
    companyName?: string;
    phoneNo?: string;
    comment?: string;
}

interface UpdateEnquiryResponse extends BaseResponse {
    data: {
        enquiry: IEnquiry;
    };
}

interface DeleteEnquiryResponse extends BaseResponse {
    data: Record<string, never>;
}

export type EnquiryError = {
    name?: string;
    email?: string;
    companyName?: string;
    phoneNo?: string;
    comment?: string;
}

const EnquiryService = () => {
    const getAllEnquiries = async (params?: GetAllEnquiriesRequest): Promise<GetAllEnquiriesResponse> => {
        const token = localStorage.getItem("token");
        const queryParams = new URLSearchParams();
        if (params?.orderBy) queryParams.append('orderBy', params.orderBy);
        if (params?.orderDirection) queryParams.append('orderDirection', params.orderDirection);

        const response = await fetch(`${API_BASE_URL}/enquiries?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        return await response.json();
    };

    const getEnquiryById = async (id: number): Promise<GetEnquiryByIdResponse> => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/enquiries/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        return await response.json();
    };

    const updateEnquiryById = async (id: number, enquiry: UpdateEnquiryRequest): Promise<UpdateEnquiryResponse> => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/enquiries/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(enquiry)
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        return await response.json();
    };

    const createEnquiry = async (enquiry: CreateEnquiryRequest): Promise<CreateEnquiryResponse> => {
        const response = await fetch(`${API_BASE_URL}/enquiries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(enquiry)
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        return await response.json();
    };

    const deleteEnquiryById = async (id: number): Promise<DeleteEnquiryResponse> => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/enquiries/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        return await response.json();
    };

    return {
        getAllEnquiries,
        getEnquiryById,
        updateEnquiryById,
        createEnquiry,
        deleteEnquiryById
    };
};

export default EnquiryService;