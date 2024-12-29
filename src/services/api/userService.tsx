interface LoginCredential {
    email: string;
    password: string;
}

const UserService = () => {
    const baseUrl = 'http://localhost:4000';
    // const userApi = UserApi(baseUrl);
    // const tokenStorage = TokenStorage();

    const login = async (loginCredential: LoginCredential): Promise<string> => {

        const response = await fetch(`${baseUrl}/login`, {
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