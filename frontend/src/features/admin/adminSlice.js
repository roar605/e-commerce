import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        products: [],
        success: false,
        loading: false,
        error: null
    },
    reducers: {
        removeErrors: state => {
            state.error = null;
        },
        removeSuccess: state => {
            state.success = false;
        },
    }
})

export const { removeErrors, removeSuccess } = adminSlice.actions
export default adminSlice.reducer