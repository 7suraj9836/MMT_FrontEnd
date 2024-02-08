import { configureStore } from "@reduxjs/toolkit";
import flightsDetail from "../features/FlightDetailsSlice";
import citiesDetail from "../features/CitiesSlice";
import usersDetail from "../features/UserDetailsSlice";

export const store = configureStore({
  reducer: {
    flights: flightsDetail,
    cities: citiesDetail,
    users: usersDetail,
  },
});
