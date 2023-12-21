import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = 'http://localhost:5000/auth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (role) => {
        try {
            const response = await axios.post(`${apiUrl}/${role}-login`, {
                username,
                password,
            });

            // Store the token in localStorage
            localStorage.setItem('token', response.data.token);

            if (role === 'customer') {
                // Redirect to the transactions page
                navigate('/transactions');
            } else {
                navigate('/accounts');
            }
        } catch (error) {
            console.error(`${role} login failed:`, error.response.data.error);
            setErrorMessage('Invalid username or password. Please try again.');
        }
    };

    return (
        <div className='login-container'>
            <h1>Login</h1>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={() => handleLogin('customer')}>Login as Customer</button>
            <button onClick={() => handleLogin('banker')}>Login as Banker</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default Login;
