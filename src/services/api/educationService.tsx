interface Education {
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
    const baseUrl = 'http://localhost:4000';
    // const educationApi = EducationApi(baseUrl);
    // const tokenStorage = TokenStorage();

    const getAllEducations = async (): Promise<Education[]> => {

        const response = await fetch(`${baseUrl}/educations`, {
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