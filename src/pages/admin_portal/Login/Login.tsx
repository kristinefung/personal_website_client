import { useState } from 'react';

import UserService from 'src/services/api/userService';

import './Login.css';

interface LoginProps {
    setAuth: (auth: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setAuth }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const userService = UserService();


    async function fetchLogin() {

        setIsLoading(true);
        try {
            const userSessionToken = await userService.login({ email, password });

            return userSessionToken;

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setIsLoading(false);
        }

    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = await fetchLogin();
        if (token) {
            localStorage.setItem("token", token);
            setAuth(true);
        }
    };

    document.body.setAttribute('id', 'login-page');
    return (
        <div className="login-container">
            <div className='head'>
                Login
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                <div className='message'>
                    {message}
                </div>
            </form>
        </div>
    );
}

export default Login;