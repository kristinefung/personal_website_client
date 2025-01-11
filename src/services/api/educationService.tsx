const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface IEducation {
    id: number;
    degree: string;
    subject: string;
    schoolName: string;
    description: string;
    startMonth: number;
    startYear: number;
    endMonth: number;
    endYear: number;
    isCurrent: number;

}

const EducationService = () => {
    // const educationApi = EducationApi(baseUrl);
    // const tokenStorage = TokenStorage();

    const getAllEducations = async (): Promise<IEducation[]> => {

        const response = await fetch(`${API_BASE_URL}/educations`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const educationsResp = await response.json();
        return educationsResp.data.educations;
    };

    // const getEducationById = async (id: number): Promise<Education> => {
    //     const educationResp: ApiResponse<Education> = await educationApi.getEducationById(id);
    //     if (educationResp.status !== 0) {
    //         throw new Error(educationResp.message);
    //     }
    //     return educationResp.data;
    // };

    // const updateEducationById = async (id: number, education: Education): Promise<Education> => {
    //     const authToken = await tokenStorage.getAuthToken();
    //     const educationResp: ApiResponse<Education> = await educationApi.updateEducationById(authToken, id, education);
    //     if (educationResp.status !== 0) {
    //         throw new Error(educationResp.message);
    //     }
    //     return educationResp.data;
    // };

    // const createEducation = async (education: Education): Promise<{ data: Education | null; errMsg: string | null }> => {
    //     const authToken = await tokenStorage.getAuthToken();
    //     const educationResp: ApiResponse<Education> = await educationApi.createEducation(authToken, education);
    //     if (educationResp.status !== 0) {
    //         return { data: null, errMsg: educationResp.message };
    //     }
    //     return { data: educationResp.data, errMsg: null };
    // };

    // const deleteEducationById = async (id: number): Promise<Education> => {
    //     const authToken = await tokenStorage.getAuthToken();
    //     const educationResp: ApiResponse<Education> = await educationApi.deleteEducationById(authToken, id);
    //     if (educationResp.status !== 0) {
    //         throw new Error(educationResp.message);
    //     }
    //     return educationResp.data;
    // };

    return {
        getAllEducations,
        // getEducationById,
        // updateEducationById,
        // createEducation,
        // deleteEducationById
    };
};

export default EducationService;