import React, { useEffect, useState } from "react";
import axios from "../Utiliss/axios";
import { Link } from "react-router-dom";
import Loading from "../Partials/Loading";

const Header = ({ setLoading }) => {
  const [wallpaper, setWallpaper] = useState(null);

  const getWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      const randomIndex = Math.floor(Math.random() * data.results.length);
      setWallpaper(data.results[randomIndex]);
      setLoading(false); // Explicitly set loading to false after success
    } catch (error) {
      console.error("Error fetching wallpaper:", error);
      setLoading(false); // Explicitly set loading to false on error
    }
  };

  useEffect(() => {
    setLoading(true); // Ensure loading is true before fetching
    getWallpaper();
  }, [setLoading]);

  if (!wallpaper) {
    return (
      <div className="text-white h-full w-screen absolute top-0 left-0 flex bg-black">
        <Loading />
      </div>
    );
  }

  return (
    <div
      className="h-[70vh] relative w-screen flex flex-col items-start justify-end p-[5%]"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, .2), rgba(0, 0, 0, .5), rgba(0, 0, 0, .8)), url(https://image.tmdb.org/t/p/original/${
          wallpaper.backdrop_path || wallpaper.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
     
      <h1 className="text-6xl w-[110vh] font-black text-white">
        {wallpaper.name ||
          wallpaper.title ||
          wallpaper.original_name ||
          wallpaper.original_title}
      </h1>
     
      <p className="text-zinc-300 w-[60%] mt-5">
        {wallpaper.overview.slice(0, 200)}
        <Link
          to={`/${wallpaper.media_type}/details/${wallpaper.id}`}
          className="text-blue-400"
        >
          ...more
        </Link>
      </p>
      <div >
      <p className="text-white mt-3 text-[2.2vh]">
        <i className="text-yellow-500 ri-megaphone-fill"></i>{" "}
        {wallpaper.release_date ? wallpaper.release_date : "NA"}
        <i className="text-yellow-500 ml-5 ri-album-fill"></i>{" "}
        <Link to={`/${wallpaper.media_type}`}>
          {wallpaper.media_type.toUpperCase()}
        </Link>
      </p>
      </div>
      <div className="flex mt-8 gap-5">
        <div className="mb-10 ">
          <Link
            to={`/${wallpaper.media_type}/details/${wallpaper.id}/trailer`}
            className="hover:text-white text-zinc-200 font-bold  p-4 rounded-xl bg-[#6556CD]"
          >
            <i className="ri-play-fill mr-2"></i>
            Watch Trailer
          </Link>
        </div>
        <div className="mb-10">
          <Link
            to={`/${wallpaper.media_type}/details/${wallpaper.id}/stream`}
            className="hover:text-white text-zinc-200 font-bold p-4 rounded-xl bg-yellow-600"
          >
            <i className="ri-play-fill mr-2"></i>
            Stream{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
