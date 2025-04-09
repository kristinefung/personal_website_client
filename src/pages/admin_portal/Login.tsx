import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Box, Typography } from '@mui/material';
import InputText from 'src/components/admin_portal/_form_element/InputText';

import UserService from 'src/services/api/userService';
import adminTheme from 'src/theme';

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

    const handleLogin = async () => {
        const token = await fetchLogin();
        if (token) {
            localStorage.setItem("token", token);
            setAuth(true);
            navigate('/dashboard');
        }
    };

    document.body.setAttribute('id', 'login-page');
    return (
        <>
            <Box component={"form"}
                width={"100vw"}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    width: {
                        sm: '480px',
                    }
                }}>
                <Box sx={{ color: adminTheme.palette.secondary.main, width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h3">
                        Login
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <InputText
                        label='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputText
                        label='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Button
                        onClick={handleLogin}
                        variant="contained"
                        color="secondary"
                        sx={{ width: '100%' }}
                    >
                        Login
                    </Button>
                </Box>
                <Box color={adminTheme.palette.error.light}>
                    {error}
                </Box>
            </Box>
        </>
    );
}

export default Login;