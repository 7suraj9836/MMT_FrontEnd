//Create Action
// export const createUser = createAsyncThunk(
//     "createUser",
//     async (data, { rejectWithValue }) => {
//       const response = await fetch(
//         "https://65a23f7942ecd7d7f0a748c3.mockapi.io/crud",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         }
//       );
//       try {
//         console.log("Data coming from form...", data);
//         const result = await response.json();
//         console.log("result sent...", result);
//         return result;
//       } catch (error) {
//         return rejectWithValue(error);
//       }
//     }
//   );

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const searchFlights = createAsyncThunk(
  "searchFlights",
  async ({ from, to, date }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/flights?from=${from}&to=${to}&date=${date}`
      );
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

export const flightsDetail = createSlice({
  name: "flightsDetail",
  initialState: {
    flights: [],
    loading: false,
    error: null,
    searchData: [],
  },

  extraReducers: (builder) => {
    // Assuming 'createUser' is an imported action creator
    builder
      .addCase(searchFlights.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.flights.push(action.payload);
        state.error = null;
      })
      .addCase(searchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong"; // Extract a user-friendly error message
      });
  },
});

export default flightsDetail.reducer;
