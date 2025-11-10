import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

//creating order


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        success: false,
        loading: false,
        error: null,
        orders: [],
        order: {},

    },
    reducers: {
        removeErrors: (state) => {
            state.error = null
        },
        removeSuccess: (state) => {
            state.success = null
        }
    }
})


export const { removeErrors, removeSuccess } = orderSlice.actions;
export default orderSlice.reducer;