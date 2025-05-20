import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseAPI = "http://localhost:3000";

const token = () => localStorage.getItem("token");

// Async thunk to fetch user info
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, thunkAPI) => {
    const jwt = token();
    if (!jwt) return thunkAPI.rejectWithValue("No token found");

    try {
      const response = await axios.get(`${baseAPI}/auth/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response.data.user;
    } catch (err) {
      localStorage.removeItem("token");
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to fetch user"
      );
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.error = null;
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload || "Failed to load user";
      });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
