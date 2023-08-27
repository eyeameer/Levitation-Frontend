import { GetFormData, IFormData } from "../../interfaces/form";
import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import axios from 'axios'
import { toast } from 'react-toastify';
import { selectIsLoggedIn } from "../login/loginSlice";
interface FormDataState {
    loading: boolean;
    userFormData: GetFormData[] | null;
}
const initialState: FormDataState = {
    loading: false,
    userFormData: null
}
export const formSubmit = createAsyncThunk<IFormData, string | Object>(
    "login/formSubmit",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post("https://levitation-assignment-backend.onrender.com/api/forms/formSubmit", data,
                { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } }
            );
            toast.success('form submission successful!');
            return response.data;
        } catch (error) {
            toast.error('form submission failed!');
            return thunkAPI.rejectWithValue(error);
        }
    }
)
export const getForms = createAsyncThunk(
    "login/getForms",
    async (thunkAPI) => {
        try {

            const response = await axios.get("https://levitation-assignment-backend.onrender.com/api/forms/getForms",
                { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } }
            );
            return response.data;
        } catch (error) {
            return error//@ts-ignore
        }
    }


)

export const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        setUserFormData: (state, action) => {
            state.userFormData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(formSubmit.pending, (state) => {
            state.loading = true
        });
        builder.addCase(formSubmit.fulfilled, (state) => {

            state.loading = false
        });
        builder.addCase(formSubmit.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(getForms.pending, (state) => {
            state.loading = true
        });
        builder.addCase(getForms.fulfilled, (state, action) => {
            state.userFormData = action.payload
            state.loading = false
        });
        builder.addCase(getForms.rejected, (state) => {
            state.loading = false
        });
    }
});
export const { setUserFormData } = formSlice.actions;
export default formSlice.reducer;