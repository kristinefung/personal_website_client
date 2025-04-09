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

    const getEducationById = async (id: number): Promise<IEducation> => {
        const response = await fetch(`${API_BASE_URL}/educations/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const educationResp = await response.json();
        return educationResp.data.education;
    };

    const updateEducationById = async (id: number, education: IEducation): Promise<void> => {
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

        return;
    };

    const createEducation = async (education: IEducation): Promise<IEducation> => {
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

        const educationResp = await response.json();
        return educationResp.data.education;
    };

    const deleteEducationById = async (id: number): Promise<void> => {
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

        return;
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