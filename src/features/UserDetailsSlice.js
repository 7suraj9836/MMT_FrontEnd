import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signUpUser = createAsyncThunk(
  "signUpUser",
  async ({ email, password, fullName }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password,fullName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Data received...", result);
      return result;
    } catch (error) {             
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
    "loginUser",
    async ({ email, password}, { rejectWithValue }) => {
      try {
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const result = await response.json();
        console.log("Data received...", result);
        return result;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

const signUpSlice = createSlice({
    name: "signUp",
    initialState: {
      user: null, // You might want to store user data if needed
      loading: false,
      error: null,
    },
    reducers: {}, // You can add additional reducers if needed
  
    extraReducers: (builder) => {
      builder
        .addCase(signUpUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(signUpUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.error = null;
        })
        .addCase(signUpUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Something went wrong";
        })
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
          })
    },
  });

  export default signUpSlice.reducer;