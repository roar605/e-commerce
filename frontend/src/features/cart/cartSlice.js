import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


//Add items to cart
export const addItemsToCart = createAsyncThunk("cart/addItemsToCart", async ({ id, quantity }, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/v1/product/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "An error occurred");
    }
}
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        loading: false,
        error: null,
        success: false,
        message: null
    },
    reducers: {
        removeErrors: (state) => {
            state.error = null
        },
        removeMessage: (state) => {
            state.message = null
        }
    },
    extraReducers: (builder) => {
        //Add items to cart
        builder.addCase(addItemsToCart.pending, (state) => {
            state.loading = true,
                state.error = null
        })
            .addCase(addItemsToCart.fulfilled, (state, action) => {
                const item = action.payload
            })
            .addCase(addItemsToCart.rejected, (state) => {

            })
    }
})
export const { removeErrors, removeMessage } = cartSlice.actions;
export default cartSlice.reducer;