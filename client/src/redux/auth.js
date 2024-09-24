import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token; // Ensure this is correctly set
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

// Export the actions
export const { setLogin, setLogout } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;