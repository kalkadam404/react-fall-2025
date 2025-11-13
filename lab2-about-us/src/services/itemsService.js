import axios from "axios";
import { genreMapRu } from "../constants/genreMap";

const API_URL = "https://api.themoviedb.org/3";
const AUTH_HEADER = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzA3ZDYxM2ZkMGI0ZDg5YWZjNWZlMDM0MmUwNTEwNCIsIm5iZiI6MTcxMTczMDYyMi44NDcwMDAxLCJzdWIiOiI2NjA2ZWZiZTJmYWY0ZDAxN2RjN2RlZjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xXjOfJveI_qa_Sewl19WGAeNd1HQSm3lqRV26xjCeLs",
  },
};

export async function fetchMovies(genreId = null) {
  const url = `${API_URL}/discover/movie?include_adult=false&include_video=false&language=ru-RU${
    genreId ? `&with_genres=${genreId}` : ""
  }`;

  try {
    const { data } = await axios.get(url, AUTH_HEADER);
    return data.results.map((movie) => ({
      ...movie,
      genre: movie.genre_ids.map((id) => genreMapRu[id]).join(", "),
    }));
  } catch (error) {
    console.error("Ошибка при загрузке фильмов:", error);
    throw error;
  }
}

export async function fetchMovieDetails(movieId) {
  const { data } = await axios.get(
    `${API_URL}/movie/${movieId}?language=ru-RU`,
    AUTH_HEADER
  );
  return data;
}

export async function fetchMovieTrailers(movieId) {
  const { data } = await axios.get(
    `${API_URL}/movie/${movieId}/videos?language=en-US`,
    AUTH_HEADER
  );

  return data.results.filter((video) => video.type === "Trailer");
}

export const searchMovies = async (search) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=ru-Ru&page=1`,
    AUTH_HEADER
  );

  return data.results
    .filter((item) => item.media_type === "movie")
    .map((movie) => ({
      ...movie,
      genre: movie.genre_ids.map((id) => genreMapRu[id]).join(", "),
    }));
};
