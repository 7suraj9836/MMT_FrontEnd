// // FlightListing.js

// import React, { useState,useEffect } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
// import './FlightListing.css'
// import {useSelector,useDispatch } from "react-redux";
// import {searchFlights,updateCurrentPage} from '../../features/FlightDetailsSlice'
// import Pagination from '@mui/material/Pagination';
// import { useLocation } from 'react-router-dom';

// const FlightListing1 = () => {

//   const location = useLocation();
//   const [flightsAPI, setFlightsAPI] = React.useState([]);
//   const { from, to, date } = location.state;
//   const { flights, loading, searchData, totalPages, currentPage, pageSize } = useSelector((state) => state.flights);

//   const dispatch = useDispatch();

//   useEffect(() => {

//     dispatch(searchFlights({ from, to, date, page: currentPage, limit: pageSize }));
//   }, [dispatch,currentPage]);

//   useEffect(() => {

//     const currentFlights = flights;

//     setFlightsAPI(currentFlights);
//   }, [flights, currentPage, pageSize]);

//   if (loading) {
//     return <CircularProgress />;
//   }

//   const paginate = (page) => {

//     dispatch(updateCurrentPage (page));
//   };

//   return (
//     <div className="flight-listing-container">
//       <h2>Flight Listings</h2>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Departure Time</TableCell>
//               <TableCell>Departure City</TableCell>
//               <TableCell>Destination Time</TableCell>
//               <TableCell>Destination City</TableCell>
//               <TableCell>Duration</TableCell>
//               <TableCell>Price</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {flightsAPI?.map((flight, index) => (
//               <TableRow key={index}>
//                 <TableCell>{flight.data.name}</TableCell>
//                 <TableCell>{flight.data.departureTime}</TableCell>
//                 <TableCell>{flight.data.departureCity}</TableCell>
//                 <TableCell>{flight.data.destinationTime}</TableCell>
//                 <TableCell>{flight.data.destinationCity}</TableCell>
//                 <TableCell>{flight.data.duration}</TableCell>
//                 <TableCell>${flight.data.price}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Pagination
//         count={totalPages}
//         page={currentPage}
//         onChange={paginate}
//         color="primary"
//       />
//     </div>
//   );
// };

// export default FlightListing;

import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  searchFlights,
  updateCurrentPage,
} from "../../features/FlightDetailsSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import { useLocation } from "react-router-dom";

const FlightListing = () => {
  const { flights, loading, totalPages, currentPage, pageSize, sortBy, sortOrder } = useSelector(
    (state) => state.flights
  );
  const[sortModel,setSortModel]=useState({
    field: sortBy, // Default sort field
     sort: sortOrder, // Default sort order
   });
  const location = useLocation();
  const { from, to, date } = location.state;
  const dispatch = useDispatch();
  const [flightsAPI, setFlightsAPI] = useState([]);
  

  useEffect(() => {
    dispatch(
      searchFlights({ from, to, date, page: currentPage, limit: pageSize })
    );
  }, [dispatch, currentPage, from, to, date, pageSize]);

  useEffect(() => {
    console.log('flights',flights);
    let currentFlights = flights.map((flight, index) => ({
      id: index + 1,
      name: flight.data.name,
      departureTime: flight.data.departureTime,
      departureCity: flight.data.departureCity,
      destinationTime: flight.data.destinationTime,
      destinationCity: flight.data.destinationCity,
      duration: flight.data.duration,
      price: flight.data.price,
    }));
    setFlightsAPI([...currentFlights]);
  }, [flights, currentPage, pageSize]);

  const paginate = (page) => {
    dispatch(updateCurrentPage({ page, sortBy: sortModel.field, sortOrder: sortModel.sort }));
  };

  if (loading) {
    return <CircularProgress />;
  }

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "departureTime", headerName: "Departure Time", width: 150 },
    { field: "departureCity", headerName: "Departure City", width: 150 },
    { field: "destinationTime", headerName: "Destination Time", width: 150 },
    { field: "destinationCity", headerName: "Destination City", width: 150 },
    { field: "duration", headerName: "Duration", width: 110 },
    { field: "price", headerName: "Price", width: 110 },
  ];

  // const handleSortChange = (sortModel1) => {
  //   // Extract the sorting parameters from the sort model
  //   const { field, sort } = sortModel1!==undefined?sortModel1[0]:sortModel;
  //   console.log(field,sort);
  //   // Trigger API call with sorting parameters
  //   dispatch(
  //     searchFlights({
  //       from,
  //       to,
  //       date,
  //       page: currentPage,
  //       limit: pageSize,
  //       sortBy: field,
  //       sortOrder: sort === "asc" ? "asc" : "desc", // Ensure sortOrder is always "asc" or "desc"
  //     })
  //   );
  //   setSortModel({field,sort})
  // };

  // const handleSortChange = (sortModel1) => {
  //   // Extract the sorting parameters from the sort model
  //   const { field, sort } = sortModel1 !== undefined ? sortModel1[0] : sortModel;
  //   console.log(field, sort);
  
  //   // Update local state with sorting parameters
  //   setSortModel({ field, sort });
  
  //   // Trigger API call with sorting parameters
  //   dispatch(
  //     searchFlights({
  //       from,
  //       to,
  //       date,
  //       page: currentPage,
  //       limit: pageSize,
  //       sortBy: field,
  //       sortOrder: sort === "asc" ? "asc" : "desc", // Ensure sortOrder is always "asc" or "desc"
  //     })
  //   );
  // };
  
  const handleSortChange = (sortModel1) => {
    // Ensure that sortModel1 is defined before attempting to destructure
    if (sortModel1 && sortModel1.length > 0) {
      const { field, sort } = sortModel1[0];
      console.log(field, sort);
  
      // Update local state with sorting parameters
      setSortModel((prevSortModel) => ({
        ...prevSortModel,
        field,
        sort,
      }));
  
      // Trigger API call with sorting parameters
      dispatch(
        searchFlights({
          from,
          to,
          date,
          page: currentPage,
          limit: pageSize,
          sortBy: field,
          sortOrder: sort === "asc" ? "asc" : "desc",
        })
      );

       dispatch(
      updateCurrentPage({
        page: currentPage,
        sortBy: field,
        sortOrder: sort === "asc" ? "asc" : "desc",
      })
    );
    }
  };
  

  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={flightsAPI}
          columns={columns}
          pagination={false}
          pageSize={pageSize}
          loading={loading}
          disableSelectionOnClick
          sortModel={[
           
            sortModel
          ]}
          onSortModelChange={handleSortChange}
          count={totalPages}
          page={currentPage}
          onPageChange={(_, newPage) => paginate(newPage)}
          sx={{ "& .MuiDataGrid-footerContainer": { display: "none" } }}
        />
        <Pagination
          style={{ marginTop: "20px", float: "right" }}
          count={totalPages}
          page={currentPage}
          onChange={(_, newPage) => paginate(newPage)}
        />
      </Box>
    </>
  );
};

export default FlightListing;
