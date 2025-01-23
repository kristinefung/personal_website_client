import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UserService from 'src/services/api/userService';

interface LoginProps {
    setAuth: (auth: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setAuth }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

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
            navigate('/dashboard');
        }
    };

    document.body.setAttribute('id', 'login-page');
    return (
        <div className="login-container bg-white w-[350px] h-[500px] rounded-md">
            <div className='head  h-[150px] flex flex-col justify-center items-center text-[40px]'>
                Login
            </div>
            <form className="form h-[300px] flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="h-[30px] w-[250px] my-[15px] mx-[20px] text-[18px]"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="h-[30px] w-[250px] my-[15px] mx-[20px] text-[18px]"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="h-[40px] w-[250px] my-[15px] mx-[20px] border-none text-[18px] text-white bg-[#376ae3] cursor-pointer">Login</button>
                <div className='message h-[50px] text-[#d50a0a]'>
                    {message}
                </div>
            </form>
        </div>
    );
}

export default Login;