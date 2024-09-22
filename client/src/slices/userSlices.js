import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk('user/register', async (userData) => {
    const formData = new FormData();
    Object.keys(userData).forEach(key => {
        formData.append(key, userData[key]);
    });

    // Use await fetch to send the request
    const res = await fetch("http://localhost:4000/api/users/register", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to register');
    }

    const data = await res.json();
    return data;
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const selectUser = (state) => state.user;

export default userSlice.reducer;