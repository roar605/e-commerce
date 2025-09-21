import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//register API
export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/v1/register", userData, config);
      // console.log("registeration data", data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Registeration failed. Try again later"
      );
    }
  }
);

//login API
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/login",
        { email, password },
        config
      );
      // console.log("Login data", data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Login failed. Try again later"
      );
    }
  }
);

export const loadUser = createAsyncThunk('user/loadUser', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('api/v1/profile');
    return data
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to load user profile')
  }
})

//logout user
export const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('api/v1/logout', { withCredentials: true });
    return data
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Logout failed')
  }
})



const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
    isAuthenticated: false,
  },
  reducers: {
    removeErrors: state => {
      state.error = null;
    },
    removeSuccess: state => {
      state.success = null;
    },
  },
  extraReducers: builder => {
    //registeration case
    builder
      .addCase(register.pending, state => {
        (state.loading = true), (state.error = null);
      })
      .addCase(register.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = null),
          (state.success = action.payload.success),
          (state.user = action.payload?.user || null),
          (state.isAuthenticated = Boolean(action.payload?.user));
      })
      .addCase(register.rejected, (state, action) => {
        (state.loading = false),
          (state.error =
            action.payload?.message || "Registeration failed. Try again later"),
          (state.user = null),
          (state.isAuthenticated = false);
      });

    //login case
    builder
      .addCase(login.pending, state => {
        (state.loading = true), (state.error = null);
      })
      .addCase(login.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = null),
          (state.success = action.payload.success),
          (state.user = action.payload?.user || null),
          (state.isAuthenticated = Boolean(action.payload?.user));
      })
      .addCase(login.rejected, (state, action) => {
        (state.loading = false),
          (state.error =
            action.payload?.message || "Registeration failed. Try again later"),
          (state.user = null),
          (state.isAuthenticated = false);
      });

    //loading case
    builder
      .addCase(loadUser.pending, state => {
        (state.loading = true), (state.error = null);
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = null),
          (state.user = action.payload?.user || null),
          (state.isAuthenticated = Boolean(action.payload?.user));
      })
      .addCase(loadUser.rejected, (state, action) => {
        (state.loading = false),
          (state.error =
            action.payload?.message || "Registeration failed. Try again later"),
          (state.user = null),
          (state.isAuthenticated = false);
      });

    //logout user
    builder
      .addCase(logout.pending, state => {
        (state.loading = true), (state.error = null);
      })
      .addCase(logout.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = null),
          (state.user = null),
          (state.isAuthenticated = false);
      })
      .addCase(logout.rejected, (state, action) => {
        (state.loading = false),
          (state.error =
            action.payload?.message || "Registeration failed. Try again later")
      });

  },
});

export const { removeErrors, removeSuccess } = userSlice.actions;
export default userSlice.reducer;
