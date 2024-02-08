

// import React, { useState } from 'react';
// import './SearchForm.css';

// const SearchForm = () => {
//   const [from, setFrom] = useState('');
//   const [to, setTo] = useState('');
//   const [date, setDate] = useState('');

//   const cities = ['New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Seattle'];

//   const handleSearch = () => {
//     // Add your search logic here
//     console.log('From:', from);
//     console.log('To:', to);
//     console.log('Date:', date);
//     // You can perform search, API calls, etc. in this function
//   };

//   return (
//     <div className="search-form-container">
//       <div className="search-field">
//         <label htmlFor="from">From:</label>
//         <select id="from" value={from} onChange={(e) => setFrom(e.target.value)}>
//           <option value="">Select departure city</option>
//           {cities.map((city) => (
//             <option key={city} value={city}>
//               {city}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="search-field">
//         <label htmlFor="to">To:</label>
//         <select id="to" value={to} onChange={(e) => setTo(e.target.value)}>
//           <option value="">Select destination city</option>
//           {cities.map((city) => (
//             <option key={city} value={city}>
//               {city}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="search-field">
//         <label htmlFor="date">Date:</label>
//         <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
//       </div>

//       <div className="search-bar">
//         <button onClick={handleSearch}>Search</button>
//       </div>
//     </div>
//   );
// };

// export default SearchForm;

// SearchForm.js

import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './SearchForm.css';
import { useNavigate} from 'react-router-dom';
import {searchFlights} from '../../features/FlightDetailsSlice';
import {cityList} from '../../features/CitiesSlice';

const validationSchema = Yup.object({
  from: Yup.string().required('Select departure city'),
  to: Yup.string().required('Select destination city'),
  date: Yup.date().required('Select a date'),
});

const SearchForm = () => {
  const { loading } = useSelector((state) => state.flights);
  const { cities } = useSelector((state) => state.cities);
  const dispatch = useDispatch();
  const [allCities, setAllCities] = useState(cities);

  const navigate = useNavigate();
  const initialValues = {
    from: '',
    to: '',
    date: '',
  };

  useEffect(() => {
    // Dispatch the cityList action here
    dispatch(cityList());
  }, [dispatch]); // Include dispatch in the dependency array

  useEffect(() => {
    // Update allCities when cities prop changes
    setAllCities(cities);
  }, [cities]);

  const handleSearch = async (values) => {
    try {
      // Dispatch the searchFlights action with the form values
      await dispatch(searchFlights(values));

      // Redirect to the flight listing page
      navigate('/flightListing');
    } catch (error) {
      // Handle errors, if needed
      console.error('Error:', error);
    }
  };

  return (
    <div className="search-form-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSearch}
      >
        <Form>
          <div className="search-field">
            <label htmlFor="from">From:</label>
            <Field as="select" id="from" name="from">
              <option value="" label="Select departure city" />
              {allCities.length > 0 &&
                allCities[0].map((city, index) => (
                  <option key={index} value={city.data.name}>
                    {city.data.name}
                  </option>
                ))}
            </Field>
            <ErrorMessage name="from" component="div" className="error-message" />
          </div>

          <div className="search-field">
            <label htmlFor="to">To:</label>
            <Field as="select" id="to" name="to">
              <option value="" label="Select destination city" />
              {allCities.length > 0 &&
                allCities[0].map((city, index) => (
                  <option key={index} value={city.data.name}>
                    {city.data.name}
                  </option>
                ))}
            </Field>
            <ErrorMessage name="to" component="div" className="error-message" />
          </div>

          <div className="search-field">
            <label htmlFor="date">Date:</label>
            <Field type="date" id="date" name="date" />
            <ErrorMessage name="date" component="div" className="error-message" />
          </div>

          <div className="search-bar">
            <button type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};



export default SearchForm;
