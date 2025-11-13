import React from "react";
import moviePoster from "../assets/poster.jpg";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Welcome to KinoArea 🎬
      </h1>
      <p className="max-w-xl text-lg text-gray-300 mb-8">
        Discover the world of cinema — explore popular movies, read reviews, and
        stay up to date with the latest releases!
      </p>
      <img
        src={moviePoster}
        alt="Movie Poster"
        className="w-72 md:w-96 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};

export default Home;
