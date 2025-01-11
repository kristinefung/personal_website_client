const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface ILoginCredential {
    email: string;
    password: string;
}

const UserService = () => {
    // const userApi = UserApi(baseUrl);
    // const tokenStorage = TokenStorage();

    const login = async (loginCredential: ILoginCredential): Promise<string> => {

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

    const verifyUserSessionToken = async (token: string): Promise<void> => {

        const response = await fetch(`${API_BASE_URL}/verify-user-session-token`, {
            method: 'GET',
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
        login,
        verifyUserSessionToken,
    };
};

export default UserService;