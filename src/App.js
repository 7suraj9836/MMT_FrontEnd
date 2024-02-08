import './App.css';
import FlightListing from './components/FlightListing/FlightListing';
import LoginPage from './components/LoginPage';
import SearchForm from './components/SearchForm/SearchForm';
import SignUpPage from "./components/SignUp/SignUpPage"
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <h1 style={{textAlign:"center"}}>Make My Trip Clone</h1>
   
    <BrowserRouter>
       
        <Routes>
          <Route exact path="/" element={<SignUpPage/>} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/searchForm" element={<SearchForm />} />
          <Route exact path="/flightListing" element={<FlightListing/>} />
          
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
