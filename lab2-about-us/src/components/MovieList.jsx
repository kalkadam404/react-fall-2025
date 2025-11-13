import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import movieGenre from "../constants/genre";
import { MovieCard } from "./MovieCard";
import { Spinner } from "./Spinner";
import { ErrorBox } from "./ErrorBox";
import { EmptyState } from "./EmptyState";
import { fetchMovies, searchMovies } from "../services/itemsService";
import { useSearchParams } from "react-router-dom";

export function MovieList() {
  // const debouncedSearch = useDebounce(searchTerm, 500);
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAllMovies, setShowAllMovies] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [search, setSearch] = useState(queryParam);
  const debouncedSearch = useDebounce(search, 500);

  const loadMovies = async () => {
    setLoading(true);
    try {
      let fetchedMovies = [];
      if (debouncedSearch) {
        fetchedMovies = await searchMovies(debouncedSearch);
      } else {
        fetchedMovies = await fetchMovies(selectedGenre);
      }
      setMovies(fetchedMovies);
      setError("");
    } catch (error) {
      setError("Ошибка:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setSearchParams(value ? { q: value } : {});
  };
  const changeGenre = (genreId) => {
    setSelectedGenre(genreId);
  };

  useEffect(() => {
    loadMovies();
  }, [selectedGenre, debouncedSearch]);

  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} />;
  const isEmpty = !loading && movies.length === 0;
  return (
    <div className="p-10 bg-[#1e2538] bg-[url('/bg.png')] bg-cover bg-center bg-fixed min-h-screen">
      <div className="w-full max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Поиск фильма..."
          value={search}
          onChange={handleSearchChange}
          className="w-full px-4 py-3 rounded-xl bg-[#2a3150] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
        />
      </div>

      {isEmpty ? (
        <EmptyState text="Фильмы не найдены" />
      ) : (
        <>
          <div className="flex flex-col gap-4 max-sm:gap-3">
            <div className="flex gap-3 justify-between items-center max-sm:justify-center">
              <div className="text-5xl font-bold text-white max-sm:text-[32px]">
                Сейчас в кино
              </div>
              <img src="/vector_mobile.svg" alt="" className="lg:hidden" />
              <div className="w-14 border border-white border-b max-sm:hidden"></div>
              <ul className="flex flex-wrap gap-4 text-slate-400 justify-center items-center">
                {movieGenre.slice(0, 8).map((item) => (
                  <li
                    key={item.id}
                    onClick={() => changeGenre(item.genreId)}
                    className={`cursor-pointer transition ${
                      selectedGenre === item.genreId
                        ? "text-white underline underline-offset-4"
                        : "hover:text-white"
                    }`}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-5 mt-20 max-sm:grid-cols-2">
            {(showAllMovies ? movies : movies.slice(0, 8)).map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                title={movie.title}
                genre={movie.genre}
                vote_average={movie.vote_average}
              />
            ))}
          </div>

          {!loading && (
            <button
              onClick={() => setShowAllMovies((prev) => !prev)}
              className="cursor-pointer mt-8 border-2 border-white py-3 px-5 w-52 rounded-lg text-center text-white text-base m-auto block hover:bg-white hover:text-black transition"
            >
              {showAllMovies ? "Скрыть новинки" : "Все новинки"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
