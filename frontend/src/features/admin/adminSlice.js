import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//fetch all products
export const fetchAdminProducts = createAsyncThunk('admin/fetchAdminProducts', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/api/v1/admin/products')
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data || "Error while fetching products")
    }
})

//Create products
export const createProduct = createAsyncThunk('admin/createProduct', async (productData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }
        const { data } = await axios.post('/api/v1/admin/product/create', productData, config)
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Product creation failed.")
    }
})

//update the product
export const updateProduct = createAsyncThunk('admin/updateProduct', async ({ id, formData }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/product/${id}`, formData, config)
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Product updation failed.")
    }
})

//delete the product
export const deleteProduct = createAsyncThunk('admin/deleteProduct', async (productId, { rejectWithValue }) => {
    try {
        const { data } = await axios.delete(`/api/v1/admin/product/${productId}`)
        return { productId };
    } catch (error) {
        return rejectWithValue(error.response?.data || "Product deletion failed")
    }
})

//fetch all users
export const fetchUsers = createAsyncThunk('admin/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/v1/admin/users`)
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch users")
    }
})

//get single user
export const getSingleUser = createAsyncThunk('admin/getSingleUser', async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/v1/admin/user/${id}`)
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch the user")
    }
})

//update user role
export const updateUserRole = createAsyncThunk('admin/getSingleUser', async ({ userId, role }, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`/api/v1/admin/user/${userId}`, { role })
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to update user role")
    }
})

//delete single user
export const deleteUser = createAsyncThunk('admin/deleteUser', async (userId, { rejectWithValue }) => {
    try {
        const { data } = await axios.delete(`/api/v1/admin/user/${userId}`)
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to delete user.")
    }
})

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        products: [],
        success: false,
        loading: false,
        error: null,
        product: {},
        deleting: {},
        users: [],
        user: {},
        message: null
    },
    reducers: {
        removeErrors: state => {
            state.error = null;
        },
        removeSuccess: state => {
            state.success = false;
        },
        clearMessage: (state) => {
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.message || 'Error while fetching the products'
            })

        builder
            .addCase(createProduct.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success
                state.products.push(action.payload.product)
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.message || 'Product creation failed'
            })

        builder
            .addCase(updateProduct.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success
                state.product = action.payload.product
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.message || 'Product updation failed'
            })

        builder
            .addCase(deleteProduct.pending, (state, action) => {
                const productId = action.meta.arg
                state.deleting[productId] = true

            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const productId = action.payload.productId
                state.deleteLoading = false;
                state.products = state.products.filter(product => product._id !== productId)
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                const productId = action.meta.arg
                state.deleting[productId] = false
                state.error = action.payload?.message || 'Product deletion failed'
            })

        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.message || "Failed to fetch users"
            })

        builder
            .addCase(getSingleUser.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(getSingleUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user
            })
            .addCase(getSingleUser.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.message || "Failed to fetch the user."
            })

        builder
            .addCase(updateUserRole.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(updateUserRole.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success
            })
            .addCase(updateUserRole.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.message || "Failed to update user role."
            })

        builder
            .addCase(deleteUser.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.message || "Failed to delete user."
            })
    }
})

export const { removeErrors, removeSuccess, clearMessage } = adminSlice.actions
export default adminSlice.reducer