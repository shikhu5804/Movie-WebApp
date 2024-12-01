import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../Partials/Topbar";
import Dropdown from "../Partials/Dropdown";
import { useState } from "react";
import axios from "../Utiliss/axios";
import noimage from "/noimage.png";
import { Link } from "react-router-dom";


const Movie = () => {
  document.title = "Movie";


  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movie, setMovie] = useState([]);

  const getMovie = async (cat) => {
    try {
      const { data } = await axios.get(`/movie/${cat}`);
      setMovie(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  console.log(movie);

  useEffect(() => {
    getMovie(category);
  }, [category]);

  const handleSelectChange = (value) => {
    setCategory(value);
  };


  return (
    <div className="w-screen h-screen px-8 text-white overflow-auto">
      <div className="w-full h-[10vh] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <i
            onClick={() => navigate(-1)}
            className="text-zinc-400 text-2xl relative z-40 hover:text-[#6556CD] ri-arrow-left-line mt-1 cursor-pointer"
          ></i>
          
          <h1 className="font-bold text-2xl text-zinc-400">Movie <span className="text-[#6556CD]">({category})</span></h1>
        </div>

        <div className="flex-1 flex backdrop-blur-0 z-10 bg-transparent ml-[-20%] p-7 justify-center ">
          <Topbar />
        </div>

        <div className="flex space-x-4 relative z-40">
          <Dropdown title="Category" onSelectChange={handleSelectChange}>
            <option value="now_playing">Now Playing</option>
            <option value="popular">Popular</option>
            <option value="top_rated">Top Rated</option>
            <option value="upcoming">Upcoming</option>
          </Dropdown>

          
        </div>
      </div>

      <div className="flex flex-wrap justify-center w-full gap-x-9 mt-10">
        {movie.map((c, i) => (
          <Link to={`/${c.media_type || "movie"}/details/${c.id}`} key={i} className="w-[35vh] relative ">
            {" "}
            <img
              className="h-[45vh] object-cover hover:scale-105 duration-150 mb-3 rounded-2xl"
              src={
                c.backdrop_path || c.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      c.backdrop_path || c.poster_path
                    }`
                  : noimage
              }
              alt=""
            />
            
            <h1 className="text-xl mb-7 font-black hover:text-[#6556CD]">
              {c.name || c.title || c.original_name || c.original_title}
            </h1>
            <div className="absolute bottom-[25%] right-[-10%] rounded-full h-[6vh] w-[6vh] flex items-center justify-center text-xl z-8 bg-yellow-500 text-white font-semibold">
             {(c.vote_average * 10).toFixed()}<sup>%</sup>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Movie;
 