import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const cityList = createAsyncThunk("cityList", async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cities`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Data received...", result);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });

  
  export const citiesDetail = createSlice({
    name: "listOfCities",
    initialState: {
      cities: [],
      loading: false,
      error: null,
      searchData:[]
    },
  
    
  
    extraReducers: (builder) => {
      // Assuming 'createUser' is an imported action creator
      builder
        .addCase(cityList.pending, (state) => {
          state.loading = true;
        })
        .addCase(cityList.fulfilled, (state, action) => {
          state.loading = false;
          state.cities.push(action.payload);
          state.error = null;
        })
        .addCase(cityList.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Something went wrong"; // Extract a user-friendly error message
        })      
            
    },
  });


  export default citiesDetail.reducer; 