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

// export const searchFlights = createAsyncThunk(
//   "searchFlights",
//   async ({ from, to, date, page = 1, limit = 8, sortByfrom, sortOrder }, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/flights?from=${from}&to=${to}&date=${date}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log("Data received...", result);
//       return result;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const searchFlights = createAsyncThunk(
  "searchFlights",
  async ({ from, to, date, page = 1, limit = 3,sortBy="name",sortOrder="asc" }, { rejectWithValue }) => {
    try {
      console.log('Search parameters:', { from, to, date, page, limit, sortBy, sortOrder });
      const response = await fetch(
        `http://localhost:5000/api/flights?from=${from}&to=${to}&date=${date}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`
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
    currentPage: 1,
    totalPages: 1,
    pageSize: 3,
    sortBy:'name',
    sortOrder:'asc'
  },

  reducers: {
    updateCurrentPage: (state, action) => {
      // Update current page and optionally include sorting information
      state.currentPage = action.payload.page;
      state.sortBy = action.payload.sortBy || state.sortBy; // Use existing sortBy if not provided
      state.sortOrder = action.payload.sortOrder || state.sortOrder; // Use existing sortOrder if not provided
      console.log( state.currentPage,state.sortBy,state.sortOrder);
    },
  },

  extraReducers: (builder) => {
    // Assuming 'createUser' is an imported action creator
    builder
      .addCase(searchFlights.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.flights = action.payload.flights;
        state.totalPages = action.payload.totalPages;
        state.error = null;
      })
      .addCase(searchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong"; // Extract a user-friendly error message
      })
      .addCase(updateCurrentPage, (state, action) => {
        state.currentPage = action.payload.page;
        state.sortBy = action.payload.sortBy;
        state.sortOrder = action.payload.sortOrder;
      });
  },
});

export const { updateCurrentPage } = flightsDetail.actions;
export default flightsDetail.reducer;
