import { User } from "../../interfaces/login";
import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import axios from 'axios'
interface AccountState {
    isLoggedIn: boolean;
    loading: boolean;
    userData: User | null,
    isRegisteredUser: boolean
}
const initialState: AccountState = {
    isLoggedIn: false,
    loading: false,
    userData: null,
    isRegisteredUser: false
}
export const signupUser = createAsyncThunk<User, Object>(
    "login/signupUser",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post("https://levitation-assignment-backend.onrender.com/api/register", data);
            localStorage.setItem('token', JSON.stringify(response.data.token))
            toast.success('Login successful!');
            return response.data;
        } catch (error) {
            toast.error('Login failed!');
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const loginUser = createAsyncThunk<User, string | Object>(
    "login/loginUser",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post("https://levitation-assignment-backend.onrender.com/api/login", data);
            localStorage.setItem('token', JSON.stringify(response.data.token))
            toast.success('Login successful!');
            return response.data;
        } catch (error) {
            toast.error('Login failed!');
            return thunkAPI.rejectWithValue(error);
        }
    }
)
export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setIsRegisteredUser: (state, action) => {
            state.isRegisteredUser = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },

    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.userData = action.payload;
            state.isLoggedIn = true
            state.loading = false
        });
        builder.addCase(loginUser.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(signupUser.pending, (state) => {
            state.loading = true
        });
        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.userData = action.payload;
            state.isLoggedIn = true
            state.loading = false
        });
        builder.addCase(signupUser.rejected, (state) => {
            state.loading = false
        });
    }
});
export const selectIsLoggedIn = (state) => state.account.isLoggedIn;
export const { setLoading, setIsLoggedIn, setUserData, setIsRegisteredUser } = accountSlice.actions;
export default accountSlice.reducer;