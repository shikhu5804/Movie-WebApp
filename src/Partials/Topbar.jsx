import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../Utiliss/axios";
import noimage from "/noimage.png";

const Topbar = ({ isHome, setLoading }) => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState([]);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearch(data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);

  return (
    <div
      className="absolute top-0 left-0 z-[200] bg-black/5 backdrop-blur-sm w-[100%] h-[8vh] text-white flex items-center justify-center"
      style={{ marginLeft: isHome ? "1%" : "15%" }}
    >
      <div className="flex w-[100vh] items-center">
        <i className="ri-search-line text-3xl"></i>
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          style={{ width: isHome ? "60%" : "54%", height : isHome ? "7vh" : "6vh" }}
          className="bg-transparent text-white font-bold w-[70%] rounded-2xl mx-10 text-l p-3 border-2 border-purple-300"
          type="text"
          placeholder="Search Anything"
        />
        {query.length > 0 && (
          <i
            onClick={() => setQuery("")}
            className="ri-close-line text-3xl"
          ></i>
        )}
      </div>

      {/* Display search results */}
      {search.length > 0 && (
        <div 
        style={{ width: isHome ? "50%" : "40%",
          marginLeft : isHome ? "-12%" : "-15%",
        }}
        className="absolute overflow-auto overflow-x-hidden flex-col  max-h-[50vh] top-[100%] ml-[-12%] rounded bg-zinc-300">
          {search.map((s, i) => (
            <Link
              to={`/${s.media_type || "movie"}/details/${s.id}`}
              key={i}
              className="hover:text-[#6556CD] text-zinc-500 duration-300 border-b-2 hover:bg-zinc-100 border-zinc-500 flex items-center justify-start h-[15vh] w-full p-10"
            >
              <img
                className="mr-20 w-[10vh] h-[10vh] object-cover rounded shadow-lg"
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.poster_path || s.profile_path
                      }`
                    : noimage
                }
                alt=""
              />
              <span className="font-bold">
                {s.name || s.title || s.original_name || s.original_title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Topbar;
