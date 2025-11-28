import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/items/movieSlice";
export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});
