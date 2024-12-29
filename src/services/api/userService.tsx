const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface LoginCredential {
    email: string;
    password: string;
}

const UserService = () => {
    // const userApi = UserApi(baseUrl);
    // const tokenStorage = TokenStorage();

    const login = async (loginCredential: LoginCredential): Promise<string> => {

        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: loginCredential.email,
                password: loginCredential.password,
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const usersResp = await response.json();
        return usersResp.data.userSessionToken;
    };

    return {
        login,
    };
};

export default UserService;