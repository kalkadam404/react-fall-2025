import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchMovieDetails,
  fetchMovies,
  fetchMovieTrailers,
  searchMovies,
} from "../../services/itemsService";

const initialState = {
  movies: [],
  selectedGenre: null,
  search: "",
  showAllMovies: false,
  loading: false,
  error: "",
  movie: {},
  trailers: [],
  trailerKey: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setGenre(state, action) {
      state.selectedGenre = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    toggleShowAll(state, action) {
      state.showAllMovies = !state.showAllMovies;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(loadMovies.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loadMovies.rejected, (state) => {
        state.error = "Ошибка загрузки фильмов";
        state.loading = false;
      });

    builder
      .addCase(loadMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload.movie;
        state.trailers = action.payload.trailers;
        if (action.payload.trailers.length > 0) {
          const rand =
            action.payload.trailers[
              Math.floor(Math.random() * action.payload.trailers.length)
            ].key;
          state.trailerKey = rand;
        } else {
          state.trailerKey = null;
        }
      })
      .addCase(loadMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loadMovieDetails.rejected, (state) => {
        state.loading = false;
        state.error = "Ошибка загрузки деталей фильма";
      });
  },
});

export const loadMovies = createAsyncThunk(
  "movies/loadMovies",
  async ({ search, genre }) => {
    if (search) return await searchMovies(search);
    return await fetchMovies(genre);
  }
);

export const loadMovieDetails = createAsyncThunk(
  "movies/loadMovieDetails",
  async (movieId) => {
    const movie = await fetchMovieDetails(movieId);
    const trailers = await fetchMovieTrailers(movieId);
    return { movie, trailers };
  }
);

export const { setGenre, setSearch, toggleShowAll } = movieSlice.actions;

export default movieSlice.reducer;
