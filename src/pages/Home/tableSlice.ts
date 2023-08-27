import { createSlice, } from "@reduxjs/toolkit";
const initialState = {
    dateRange: [null, null]
}
export const tableSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        setDateRange: (state, action) => {
            state.dateRange = action.payload
            console.log(state.dateRange)
        }
    },

}
)
export const { setDateRange } = tableSlice.actions;
export default tableSlice.reducer;