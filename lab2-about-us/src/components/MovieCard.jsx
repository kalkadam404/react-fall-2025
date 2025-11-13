import { useNavigate } from "react-router-dom";

export function MovieCard({ id, imageUrl, title, genre, vote_average }) {
  const navigate = useNavigate();
  const ratingColor =
    vote_average >= 7
      ? "bg-green-500"
      : vote_average >= 5
      ? "bg-yellow-500"
      : "bg-red-500";

  const goToFilmCard = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div
      onClick={goToFilmCard}
      className="relative flex flex-col items-start cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-60 h-96 rounded-lg mb-2 object-cover"
      />

      <p className="text-lg text-white font-medium max-sm:text-base">{title}</p>
      <p className="text-base text-yellow-400 max-sm:text-xs">{genre}</p>

      {vote_average != null && (
        <div
          className={`absolute text-white px-3 h-8 py-1 rounded-lg text-center top-3 right-6 max-sm:text-xs max-sm:h-5 max-sm:px-2 max-sm:py-0.5 max-sm:top-2 ${ratingColor}`}
        >
          {vote_average.toFixed(1)}
        </div>
      )}
    </div>
  );
}
