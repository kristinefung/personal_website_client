const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface IEnquiry {
    id?: number;
    name?: string;
    email?: string;
    companyName?: string;
    phoneNo?: string;
    comment?: string;
}

const EnquiryService = () => {
    const getAllEnquiries = async (): Promise<IEnquiry[]> => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/enquiries`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const enquiriesResp = await response.json();
        return enquiriesResp.data.enquiries;
    };

    const getEnquiryById = async (id: number): Promise<IEnquiry> => {
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

        const enquiryResp = await response.json();
        return enquiryResp.data.enquiry;
    };

    const updateEnquiryById = async (id: number, enquiry: IEnquiry): Promise<void> => {
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
    };

    const createEnquiry = async (enquiry: IEnquiry): Promise<void> => {
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
    };

    const deleteEnquiryById = async (id: number): Promise<void> => {
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