import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Topbar from "../Partials/Topbar";
import Dropdown from "../Partials/Dropdown";
import axios from "../Utiliss/axios";
import noimage from "/noimage.png";
import Loading from "../Partials/Loading";

const Movie = () => {
  document.title = "Movies";

  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movies, setMovies] = useState([]);

  const getMovies = async (cat) => {
    try {
      const { data } = await axios.get(`/movie/${cat}`);
      setMovies(data.results);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getMovies(category);
  }, [category]);

  const handleSelectChange = (value) => {
    setCategory(value);
  };

  return movies.length > 0 ? (
    <>
      <Topbar />
      <div className="w-full min-h-screen px-4 pb-[5vh] sm:px-8 lg:px-16 overflow-x-hidden text-white pt-[10vh]">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10 flex-wrap md:flex-nowrap">
          <div className="flex items-center gap-4">
            <i
              onClick={() => navigate(-1)}
              className="text-zinc-400 text-3xl hover:text-[#6556CD] cursor-pointer ri-arrow-left-line"
            />
            <h1 className="font-bold text-md md:text-2xl lg:text-3xl text-zinc-400">
              Movies{" "}
              <span className="text-[#6556CD]">
                ({category.replace("_", " ")})
              </span>
            </h1>
          </div>

          {/* Dropdown */}
          <div className="flex space-x-4 text-xs md:text-lg mt-2 md:mt-0">
            <Dropdown title="Category" onSelectChange={handleSelectChange}>
              <option value="now_playing">Now Playing</option>
              <option value="popular">Popular</option>
              <option value="top_rated">Top Rated</option>
              <option value="upcoming">Upcoming</option>
            </Dropdown>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid gap-6 sm:gap-12 md:gap-12 lg:gap-14 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {movies.map((movie, i) => (
            <Link
              to={`/movie/details/${movie.id}`}
              key={i}
              className="group duration-500 transition-transform transform hover:translate-y-[-10px] relative"
            >
              {/* Image with Rating */}
              <div className="relative w-full">
                <img
                  className="w-full h-[40vh] sm:h-[45vh] md:h-[50vh] object-cover rounded-2xl shadow-lg"
                  src={
                    movie.backdrop_path || movie.poster_path
                      ? `https://image.tmdb.org/t/p/original/${
                          movie.backdrop_path || movie.poster_path
                        }`
                      : noimage
                  }
                  alt={movie.title || "Movie"}
                />

                {/* Rating Indicator */}
                <div className="absolute bottom-4 right-4 rounded-full h-[6vh] w-[6vh] flex items-center justify-center text-lg bg-yellow-500 text-white font-semibold shadow-lg">
                  {(movie.vote_average * 10).toFixed()}
                  <sup>%</sup>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-lg sm:text-xl md:text-xl mt-3 font-bold group-hover:text-[#6556CD] transition">
                {movie.title || movie.original_title}
              </h1>
            </Link>
          ))}
        </div>
      </div>
    </>
  ) : (
    <div className="flex items-center justify-center w-screen h-screen bg-black">
      <Loading />
    </div>
  );
};

export default Movie;
