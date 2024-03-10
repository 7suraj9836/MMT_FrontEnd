import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FlightListing from "../FlightListing/FlightListing";
import Layout from "../Layout";
import SearchForm from "../SearchForm/SearchForm";
import SignUpPage from "../SignUp/SignUpPage";
import LoginPage from "../LoginPage";

const AllRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/dashboard" element={<Layout />}>
            <Route path="/dashboard/searchForm" element={<SearchForm />} />
            <Route path="/dashboardflightListing" element={<FlightListing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AllRoutes;
