const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type Enquiry = {
    id?: number;
    name?: string;
    email?: string;
    companyName?: string;
    phoneNo?: string;
    comment?: string;
}

const EnquiryService = () => {
    // const enquiryApi = EnquiryApi(baseUrl);
    // const tokenStorage = TokenStorage();

    // const getAllEnquiries = async (): Promise<Enquiry[]> => {

    //     const response = await fetch(`${baseUrl}/enquiries`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });

    //     if (!response.ok) {
    //         throw new Error(`HTTP error ${response.status}`);
    //     }

    //     const enquiriesResp = await response.json();
    //     return enquiriesResp.data.enquiries;
    // };

    // const getEnquiryById = async (id: number): Promise<Enquiry> => {
    //     const enquiryResp: ApiResponse<Enquiry> = await enquiryApi.getEnquiryById(id);
    //     if (enquiryResp.status !== 0) {
    //         throw new Error(enquiryResp.message);
    //     }
    //     return enquiryResp.data;
    // };

    // const updateEnquiryById = async (id: number, enquiry: Enquiry): Promise<Enquiry> => {
    //     const authToken = await tokenStorage.getAuthToken();
    //     const enquiryResp: ApiResponse<Enquiry> = await enquiryApi.updateEnquiryById(authToken, id, enquiry);
    //     if (enquiryResp.status !== 0) {
    //         throw new Error(enquiryResp.message);
    //     }
    //     return enquiryResp.data;
    // };

    const createEnquiry = async (enquiry: Enquiry): Promise<void> => {
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

    // const deleteEnquiryById = async (id: number): Promise<Enquiry> => {
    //     const authToken = await tokenStorage.getAuthToken();
    //     const enquiryResp: ApiResponse<Enquiry> = await enquiryApi.deleteEnquiryById(authToken, id);
    //     if (enquiryResp.status !== 0) {
    //         throw new Error(enquiryResp.message);
    //     }
    //     return enquiryResp.data;
    // };

    return {
        createEnquiry,
        // getEnquiryById,
        // updateEnquiryById,
        // createEnquiry,
        // deleteEnquiryById
    };
};

export default EnquiryService;