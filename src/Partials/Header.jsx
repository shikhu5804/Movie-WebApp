import React, { useEffect, useState } from "react";
import axios from "../Utiliss/axios";
import { Link } from "react-router-dom";
import Loading from "../Partials/Loading";

const Header = ({ setLoading }) => {
  const [wallpapers, setWallpapers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getWallpapers = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      setWallpapers(data.results);
      setCurrentIndex(0);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching wallpaper:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getWallpapers();
  }, [setLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === wallpapers.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [wallpapers.length]);

  const prevWallpaper = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? wallpapers.length - 1 : prevIndex - 1
    );
  };

  const nextWallpaper = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === wallpapers.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!wallpapers.length) {
    return (
      <div className="text-white h-full w-screen absolute top-0 left-0 flex bg-black">
        <Loading />
      </div>
    );
  }

  const wallpaper = wallpapers[currentIndex];

  return (
    <div
      className="h-screen relative w-screen flex flex-col items-start justify-end p-[5%] sm:p-[8%] md:p-[5%]"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .7)), url(https://image.tmdb.org/t/p/original/${
          wallpaper.backdrop_path || wallpaper.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Navigation Arrows */}
      <button
        className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full hover:bg-black"
        onClick={prevWallpaper}
      >
        <i className="ri-arrow-left-s-line text-2xl sm:text-3xl"></i>
      </button>

      <button
        className="absolute right-3 sm:right-5 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full hover:bg-black"
        onClick={nextWallpaper}
      >
        <i className="ri-arrow-right-s-line text-2xl sm:text-3xl"></i>
      </button>

      {/* Title */}
      <h1 className="text-white font-black w-full sm:w-[80%] text-[clamp(2rem,5vw,7rem)]">
        {wallpaper.name ||
          wallpaper.title ||
          wallpaper.original_name ||
          wallpaper.original_title}
      </h1>

      {/* Overview */}
      <p className="text-zinc-300 w-full sm:w-[70%] mt-3 sm:mt-5 text-[clamp(0.9rem,1.5vw,1.2rem)]">
        {wallpaper.overview.slice(0, 150)}
        <Link
          to={`/${wallpaper.media_type}/details/${wallpaper.id}`}
          className="text-blue-400"
        >
          ...more
        </Link>
      </p>

      <div>
        <p className="text-white mt-3 text-[clamp(1rem,1.5vw,1.2rem)]">
          <i className="text-yellow-500 ri-megaphone-fill"></i>{" "}
          {wallpaper.release_date ? wallpaper.release_date : "NA"}
          <i className="text-yellow-500 ml-5 ri-album-fill"></i>{" "}
          <Link to={`/${wallpaper.media_type}`}>
            {wallpaper.media_type.toUpperCase()}
          </Link>
        </p>
      </div>

      {/* Buttons */}
      <div className="flex mb-8 mt-6 sm:mt-8 gap-3 sm:gap-5">
        <Link
          to={`/${wallpaper.media_type}/details/${wallpaper.id}/trailer`}
          className="hover:text-white text-zinc-200 font-bold p-2 sm:p-4 rounded-lg bg-[#6556CD] text-[clamp(0.9rem,1.2vw,1rem)]"
        >
          <i className="ri-play-fill mr-1 sm:mr-2"></i>
          Watch Trailer
        </Link>

        <Link
          to={`/${wallpaper.media_type}/details/${wallpaper.id}/stream`}
          className="hover:text-white text-zinc-200 font-bold p-2 sm:p-4 rounded-lg bg-yellow-600 text-[clamp(0.9rem,1.2vw,1rem)]"
        >
          <i className="ri-play-fill mr-1 sm:mr-2"></i>
          Stream{" "}
        </Link>
      </div>

      {/* Bubbles */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
        {wallpapers.map((_, index) => {
          const distance = Math.abs(currentIndex - index);
          const maxDistance = 4; // The range of the glow effect
          const scale = 1.2 - distance * 0.1; // Decreasing scale for distance
          const opacity = 1 - distance * 0.2; // Decreasing opacity for distance

          return (
            <button
              key={index}
              className={`h-1 sm:h-1 w-2 sm:w-3 rounded-full transition-all duration-300`}
              style={{
                backgroundColor: `rgba(255, 255, 255, ${
                  opacity > 0 ? opacity : 0.1
                })`,
                transform: `scale(${scale > 0.8 ? scale : 0.8})`,
                boxShadow: index === currentIndex ? "0 0 8px #fff" : "none",
              }}
              onClick={() => setCurrentIndex(index)}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
