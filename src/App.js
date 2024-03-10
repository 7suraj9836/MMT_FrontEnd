import './App.css';
import FlightListing from './components/FlightListing/FlightListing';
import LoginPage from './components/LoginPage';
import AllRoutes from './components/Routes/AllRoutes';
import SearchForm from './components/SearchForm/SearchForm';
import Sidebar from './components/Sidebar';
import SignUpPage from "./components/SignUp/SignUpPage"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  const isAuthenticated = true;
  return (
    <div> 
     {isAuthenticated ? (<AllRoutes />) : (<Navigate to="/login" replace />)}
   </div>
  );
}

export default App;
