import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Spinner } from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { loadMovieDetails } from "../features/items/movieSlice";

export function MovieDetail() {
  const { movie_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movie, trailerKey, loading, error } = useSelector((s) => s.movies);

  const loadData = () => {
    dispatch(loadMovieDetails(movie_id));
  };
  useEffect(() => {
    loadData();
  }, [movie_id]);

  const formattedTime = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-white">
        <h1 className="text-3xl font-bold text-black">Ошибка загрузки</h1>
        <p className="text-gray-300">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-white text-black rounded-lg"
        >
          ← Назад
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex flex-col items-center py-20 text-black gap-3">
        <h1 className="text-3xl font-bold">Фильм не найден</h1>
        <p className="text-gray-300">Возможно, он был удалён или недоступен.</p>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-white text-black rounded-lg"
        >
          ← Назад
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-9 justify-center py-14 px-10  bg-[#1e2538] bg-[url('/bg.png')] bg-cover bg-center bg-fixed">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 self-start px-4 py-2 bg-white hover:bg-white/60 rounded-lg transition-colors"
      >
        ← Назад
      </button>
      <div className="flex items-center gap-9 justify-center">
        <div className="bg-[#191E2E] rounded-xl w-[350px] h-[460px] flex items-center justify-center max-sm:hidden">
          {movie.poster_path != null ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt=""
              className="rounded-xl w-[350px] h-[460px]"
            />
          ) : (
            <div className="flex flex-col gap-5 items-center relative">
              <div className="flex flex-col gap-2 items-center">
                <img src="/poster1.svg" alt="" />
                <p className="text-[#404961] text-3xl font-medium">
                  К сожалению,
                </p>
                <p className="text-[#404961] text-3xl font-medium">
                  Постер отсутствует
                </p>
              </div>
              <div className="flex gap-2 absolute -bottom-28">
                <img src="/cin1.svg" alt="" />
                <p className="text-[#404961] text-xl font-bold">Kinoarea</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 max-sm:gap-1">
          <div className="flex items-center gap-2">
            <Link to="/">
              <span className="text-[#4F5B7C] max-sm:text-[16px]">Главная</span>
            </Link>
            <img src="/arrow3.svg" alt="Arrow Icon" />
            <span className="text-[#4F5B7C] max-sm:text-[16px]">Фильмы</span>
            <img src="/arrow3.svg" alt="Arrow Icon" />
            <span className="text-white max-sm:text-[16px]">{movie.title}</span>
          </div>
          <div className="text-white text-4xl font-bold max-sm:text-3xl">
            {movie.title}
          </div>
          <div className="text-white text-lg max-sm:mb-3">
            {movie.original_title}
          </div>
          <div className="flex items-start gap-5">
            <div className="bg-[#191E2E] rounded-xl w-[350px] h-[460px] flex items-center justify-center lg:hidden max-sm:w-[230px] max-sm:h-[310px]">
              {movie.poster_path != null ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=""
                  className="rounded-xl w-[350px] h-[460px]"
                />
              ) : (
                <div className="flex flex-col gap-5 items-center relative">
                  <div className="flex flex-col gap-2 items-center">
                    <img src="/poster1.svg" alt="" />
                    <p className="text-[#404961] text-3xl font-medium">
                      К сожалению,
                    </p>
                    <p className="text-[#404961] text-3xl font-medium">
                      Постер отсутствует
                    </p>
                  </div>
                  <div className="flex gap-2 absolute -bottom-28">
                    <img src="/cin1.svg" alt="" />
                    <p className="text-[#404961] text-xl font-bold">Kinoarea</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="max-sm:mt-3">
            <p className="text-white w-[600px] max-sm:text-[15px] max-sm:w-[348px]">
              {movie.overview}
            </p>
          </div>
          <div className="flex items-center gap-6 max-sm:flex-col max-sm:mt-10">
            <div className="flex gap-2 items-center justify-center cursor-pointer border-2 border-white py-5 px-3 rounded-xl text-center text-white text-base max-sm:py-3">
              <img src="/play_icon.svg" alt="" />
              <p>Смотреть трейлер</p>
            </div>

            <div className="flex gap-3.5 max-sm:gap-5">
              <img src="/vk_white.svg" alt="" className="w-4 h-4" />
              <img src="/insta_white.svg" alt="" className="w-4 h-4" />
              <img src="/f_white.svg" alt="" className="w-4 h-4" />
              <img src="/twit_white.svg" alt="" className="w-4 h-4" />
              <img src="/point3.svg" alt="" className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 w-full justify-around max-sm:flex-col max-sm:gap-0 max-sm:text-[12px]">
        <div className="flex gap-5 max-sm:gap-2">
          <div className="flex flex-col gap-2 text-white max-sm:w-[100px]">
            <p>Год:</p>
            <p>Страна:</p>
            <p>Режиссер:</p>
            <p>Сценарий:</p>
            <p>Продюсер:</p>
            <p>Оператор:</p>
            <p>Композитор:</p>
          </div>
          <div className="flex flex-col gap-2 text-yellow-400">
            <p>{movie.release_date?.split("-")[0]}</p>
            <p>{movie.origin_country?.[0] || "Страна не указана"}</p>
            <p>Фрэнсис Аннан</p>
            <p>Фрэнсис Аннан, Л.Х. Адамс</p>
            <p>Дэвид Баррон, Марк Блэйни</p>
            <p>Джеффри Холл</p>
            <p>Дэвид Хиршфелдер</p>
            <p></p>
          </div>
        </div>
        <div className="flex gap-5 max-sm:gap-2">
          <div className="flex flex-col gap-2 text-white">
            <p>Художник:</p>
            <p>Монтаж:</p>
            <p>Жанр:</p>
            <p>Сборы в мире:</p>
            <p>Премьера (мир):</p>
            <p>Возраст:</p>
            <p>Время:</p>
          </div>
          <div className="flex flex-col gap-2 text-yellow-400">
            <p>Скотт Бёрд, Эрика Брайан</p>
            <p>Ник Фентон</p>
            <p>
              {movie.genres
                ? movie.genres.map((item) => item.name).join(", ")
                : "Жанры не указаны"}
            </p>
            <p>${movie.revenue?.toLocaleString("en-US").replace(/,/g, " ")}</p>
            <p>{formatDate(movie.release_date)}</p>
            <p>16+</p>
            <p>
              {movie.runtime} мин. /{formattedTime(movie.runtime)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 w-full">
        <div className="flex gap-3 justify-between items-center max-sm:flex-col">
          <div className="text-5xl font-bold text-white max-sm:hidden">
            Трейлеры фильма
          </div>
          <div className="text-3xl font-bold text-white lg:hidden">
            Новые трейлеры
          </div>
          <div className="flex items-center gap-5">
            <div className="text-white text-xl max-sm:text-[18px]">
              Все трейлеры
            </div>
            <img src="/arrow_next.svg" alt="arrowNext" />
          </div>
        </div>
        {trailerKey ? (
          <div
            className="mt-10 relative w-full overflow-hidden"
            style={{
              paddingTop: "56.25%",
            }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              loading="lazy"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="mt-10 text-center text-white text-lg">
            Трейлеры пока недоступны
          </div>
        )}
      </div>
    </div>
  );
}
