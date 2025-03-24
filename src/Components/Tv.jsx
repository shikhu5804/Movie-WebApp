import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Topbar from "../Partials/Topbar";
import Dropdown from "../Partials/Dropdown";
import axios from "../Utiliss/axios";
import noimage from "/noimage.png";
import Loading from "../Partials/Loading";

const Tv = () => {
  document.title = "TV Shows";

  const navigate = useNavigate();
  const [category, setCategory] = useState("airing_today");
  const [tv, setTv] = useState([]);

  const getTv = async (cat) => {
    try {
      const { data } = await axios.get(`/tv/${cat}`);
      setTv(data.results);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getTv(category);
  }, [category]);

  const handleSelectChange = (value) => {
    setCategory(value);
  };

  return tv.length > 0 ? (
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
              TV Shows <span className="text-[#6556CD]">({category})</span>
            </h1>
          </div>

          {/* Dropdown */}
          <div className="flex space-x-4 text-xs md:text-lg mt-2 md:mt-0">
            <Dropdown title="Category" onSelectChange={handleSelectChange}>
              <option value="airing_today">Airing Today</option>
              <option value="on_the_air">On The Air</option>
              <option value="top_rated">Top Rated</option>
              <option value="popular">Popular</option>
            </Dropdown>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid gap-6 sm:gap-12 md:gap-12 lg:gap-14 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {tv.map((c, i) => (
            <Link
              to={`/${c.media_type || "tv"}/details/${c.id}`}
              key={i}
              className="group duration-500 transition-transform transform hover:translate-y-[-10px] relative"
            >
              {/* Image with Rating */}
              <div className="relative w-full">
                <img
                  className="w-full h-[40vh] sm:h-[45vh] md:h-[50vh] object-cover rounded-2xl shadow-lg"
                  src={
                    c.backdrop_path || c.profile_path || c.poster_path
                      ? `https://image.tmdb.org/t/p/original/${
                          c.backdrop_path || c.poster_path || c.profile_path
                        }`
                      : noimage
                  }
                  alt={c.name || c.title || "TV Show"}
                />
                
                {/* Rating Indicator */}
                <div className="absolute bottom-4 right-4 rounded-full h-[6vh] w-[6vh] flex items-center justify-center text-lg bg-yellow-500 text-white font-semibold shadow-lg">
                  {(c.vote_average * 10).toFixed()}<sup>%</sup>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-lg sm:text-xl md:text-xl mt-3 font-bold group-hover:text-[#6556CD] transition">
                {c.name || c.title || c.original_name || c.original_title}
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

export default Tv;
