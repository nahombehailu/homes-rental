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

export default function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        profileImage: null,
    });
    const [formdata, setFormdata] = useState({});
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profileImage') {
            setFormData({ ...formData, profileImage: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
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
        if (formData.password !== formData.confirmPassword) {
            showToast("Passwords do not match", 'error');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            const res = await fetch("http://localhost:4000/api/users/register", {
                method: "POST",
                body: formDataToSend,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to register');
            }

            const data = await res.json();
            setSuccess(true);
            console.log('Registration successful:', data);
            showToast('Registration successful!', 'success');
            navigate('/login');
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    console.log(formData);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Register</Typography>
            {loading && <CircularProgress />}
            
<form onSubmit={handleSubmit}>
        
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    fullWidth
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
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
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    fullWidth
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <input
                    type="file"
                    name="profileImage"
                    id="profileImage"
                    accept="image/*"
                    onChange={handleChange}
                    required
                    style={{ display: 'none' }}
                />
                <label htmlFor="profileImage">
                    <Button variant="contained" component="span">
                        Upload ProfileImage Image
                    </Button>
                </label>
                {formData.profileImage && (
                    <img
                        src={URL.createObjectURL(formData.profileImage)}
                        alt="ProfileImage Preview"
                        style={{ marginTop: '10px', maxWidth: '100px' }}
                    />
                )}
            </Grid>
            <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    Register
                </Button>
            </Grid>
        
        </Grid>
        
                    </form>
            <Grid item xs={12}>
                <Typography variant="body2">
                    Already have an account? <Link to="/login">Login</Link>
                </Typography>
            </Grid>
            <ToastContainer />
        </Container>
    );
}

