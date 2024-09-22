import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Container,
    Grid,
    CircularProgress
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const showToast = (message, type) => {
        if (type === 'error') {
            toast.error(message);
        } else {
            toast.success(message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("http://localhost:4000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            if (!res.ok) {
                const errorData = await res.json();
                if (errorData.message === 'User not found') {
                    showToast('User not found. Please register.', 'error');
                    navigate('/register');
                } else {
                    throw new Error(errorData.message || 'Login failed');
                }
            }

            const data = await res.json();
            console.log('Login successful:', data);
            showToast('Login successful!', 'success');
            navigate('/dashboard');
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Login</Typography>
            {loading && <CircularProgress />}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={loginData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={loginData.password}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" disabled={loading}>
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            Don't have an account? <Link to="/register">Register</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
            <ToastContainer />
        </Container>
    );
}