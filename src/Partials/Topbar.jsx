import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../Utiliss/axios";
import noimage from "/noimage.png";

const Topbar = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState([]);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearch(data.results);
      console.log(search);
      console.log(query);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);

  return (
    <div className=" absolute  top-0 left-0 z-[200] bg-black/5 backdrop-blur-sm  w-[165vh] h-[8vh] text-white flex items-center ml-[20.5%] justify-start ">
      <div className="ml-[20%] flex w-[100vh]  items-center">
        <i class="ri-search-line  text-3xl"></i>
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="bg-transparent text-white font-bold w-[70vh] rounded-xl mx-10 text-l p-3 border-none "
          type="text"
          placeholder="Search Anything"
        />
        {query.length > 0 && (
          <i onClick={() => setQuery("")} class="ri-close-line text-3xl"></i>
        )}
      </div>
      {/* <div className="absolute ml-[20%] w-[50%] rounded ">
        {search && search.length > 0 ? (
          search.map((s, i) => (
            <Link
              key={i}
              to={`/details/${s.id}`} // Assuming you're using React Router, adjust this as needed
              className="hover:text-black text-zinc-500 duration-300 border-b-2 border-zinc-100 bg-zinc-300 flex items-center justify-start h-[vh] w-full p-10"
            >
              <img
                className="mr-20 w-[10vh] h-[10vh] object-cover rounded shadow-lg"
                src={
                  s.backdrop_path || s.poster_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.poster_path
                      }`
                    : noimage
                }
                alt={s.name || s.title || "No image"}
              />
              <span className="font-semibold">
                {s.name || s.title || s.original_name || s.original_title}
              </span>
            </Link>
          ))
        ) : (
          <p className="text-center text-zinc-500">No results found.</p>
        )}
      </div> */}

      <div className="absolute overflow-auto overflow-x-hidden ml-[20%] w-[50%] max-h-[50vh] top-[100%] rounded">
        {search.length > 0 &&
          search.map((s, i) => (
            <Link to={`/${s.media_type || "movie"}/details/${s.id}`}
              key={i}
              className=" hover:text-[#6556CD] text-zinc-500 duration-300 border-b-2 border-zinc-100 bg-zinc-300  flex items-center justify-start h-[15vh] w-full p-10"
            >
              <img
                className="mr-20 w-[10vh] h-[10vh] object-cover rounded shadow-lg "
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.poster_path || s.profile_path
                      }`
                    : noimage
                }
                alt=""
              />
              <span className=" font-semibold">
                {" "}
                {s.name || s.title || s.original_name || s.original_title}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Topbar;
