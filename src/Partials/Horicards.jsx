import React, { useEffect, useState } from "react";
import axios from "../Utiliss/axios";
import noimage from "/noimage.png";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import Loading from "../Partials/Loading";

const Horicards = ({ setLoading }) => {
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("all");

  const getTrending = async (categoryType) => {
    try {
      const { data } = await axios.get(`/trending/${categoryType}/day`);
      setTrending(data.results);

    
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSelectChange = (value) => {
    setCategory(value);
  };

  useEffect(() => {
    getTrending(category);
  }, [category]);

  if (!trending) {
    return (
      <h1 className="text-white absolute right-0 bg-black font-black flex items-center justify-center text-5xl h-screen w-screen">
        <Loading />
      </h1>
    );
  }

  return trending ? (
    <div className="p-5 mb-9">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white text-3xl font-black">Trending</h1>
        <Dropdown onSelectChange={handleSelectChange} title="Category">
          <option value="all">All</option>
          <option value="movie">Movies</option>
          <option value="tv">Series</option>
        </Dropdown>
      </div>

      <div className="flex gap-x-6 overflow-x-auto pb-5">
        {trending.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className="min-w-[16%] transform hover:scale-105 transition-transform duration-300 bg-zinc-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl"
          >
            <img
              className="h-[30vh] w-full object-cover"
              src={
                d.backdrop_path || d.poster_path
                  ? `https://image.tmdb.org/t/p/original/${
                      d.backdrop_path || d.poster_path
                    }`
                  : noimage
              }
              alt={d.name || d.title || "Image not available"}
            />
            <div className="p-4">
              <h1 className="text-lg font-bold text-white truncate">
                {d.name || d.title || d.original_name || d.original_title}
              </h1>
              <p className="text-sm text-zinc-400 mt-2 line-clamp-4">
                {d.overview
                  ? d.overview.slice(0, 70) + "..."
                  : "No description available"}
                <span className="text-blue-500 ml-1 underline"> more</span> 
              
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <h1 className="text-white bg-zinc-800 font-black flex items-center justify-center text-5xl h-screen w-screen">
      <Loading />
    </h1>
  );
};

export default Horicards;
