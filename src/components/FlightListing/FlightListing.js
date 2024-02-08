// FlightListing.js

import React, { useState,useEffect } from 'react';
import './FlightListing.css'
import {useSelector,useDispatch } from "react-redux";
import {searchFlights} from '../../features/FlightDetailsSlice'

const FlightListing = () => {
  const { flights, loading, searchData } = useSelector((state) => state.flights);
    // const flights=[
    //     {
    //       id: 1,
    //       name: 'Flight 1',
    //       departureTime: '08:00 AM',
    //       departureCity: 'Delhi',
    //       destinationTime: '11:00 AM',
    //       destinationCity: 'Bengaluru',
    //       duration: '02 h 50 m',
    //       price: 5800,
    //     },
    //     {
    //         id:2,
    //         name: 'Flight 1',
    //         departureTime: '08:00 AM',
    //         departureCity: 'New York',
    //         destinationTime: '11:00 AM',
    //         destinationCity: 'Los Angeles',
    //         duration: '3 hours',
    //         price: 200,
    //       },
    //       {
    //         id: 3,
    //         name: 'Flight 1',
    //         departureTime: '08:00 AM',
    //         departureCity: 'New York',
    //         destinationTime: '11:00 AM',
    //         destinationCity: 'Los Angeles',
    //         duration: '3 hours',
    //         price: 200,
    //       },
    //       {
    //         id: 4,
    //         name: 'Flight 1',
    //         departureTime: '08:00 AM',
    //         departureCity: 'New York',
    //         destinationTime: '11:00 AM',
    //         destinationCity: 'Los Angeles',
    //         duration: '3 hours',
    //         price: 200,
    //       }
    //     ];
const dispatch=useDispatch();
    useEffect(() => {
      // Dispatch the cityList action here
      dispatch(searchFlights());
    }, [dispatch]);

    useEffect(()=>{
      dispatch(searchFlights());
    },[])
    console.log('flights',flights);
    useEffect(()=>{
  setFlightsAPI(flights);
    },[flights])
    
const [flightsAPI,setFlightsAPI]=useState(flights);
console.log(flightsAPI);
  if (flightsAPI.length === 0) {
    return <div>No flights available for the selected criteria.</div>;
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="flight-listing-container">
      <h2>Flight Listings</h2>
      <table className="flight-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Departure Time</th>
            <th>Departure City</th>
            <th>Destination Time</th>
            <th>Destination City</th>
            <th>Duration</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {flightsAPI[0].map((flight, index) => (
            <tr key={index}>
              <td>{flight.data.name}</td>
              <td>{flight.data.departureTime}</td>
              <td>{flight.data.departureCity}</td>
              <td>{flight.data.destinationTime}</td>
              <td>{flight.data.destinationCity}</td>
              <td>{flight.data.duration}</td>
              <td>${flight.data.price}</td>
            </tr>
          ))}
        </tbody>  
      </table>
    </div>
  );
};

export default FlightListing;
