import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../Partials/Topbar";
import Dropdown from "../Partials/Dropdown";
import { useState } from "react";
import axios from "../Utiliss/axios";
import noimage from "/noimage.png";
import { Link } from "react-router-dom";

const Popular = () => {
  document.title = "Popular";

  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);

  const getPopular = async (cat) => {
    try {
      const { data } = await axios.get(`${cat}/popular`);
      setPopular(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getPopular(category);
  }, [category]);

  const handleSelectChange = (value) => {
    setCategory(value);
  };

  return popular ?(
    <div className="w-screen h-screen px-8 text-white overflow-x-hidden">
      <div className="w-full h-[10vh] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <i
            onClick={() => navigate(-1)}
            className="text-zinc-400 text-2xl relative z-40 hover:text-[#6556CD] ri-arrow-left-line mt-1 cursor-pointer"
          ></i>

          <h1 className="font-bold text-2xl text-zinc-400">
            Popular <span className="text-[#6556CD]">({category})</span>
          </h1>
        </div>

        <div className="flex-1 flex backdrop-blur-0 z-10 bg-transparent ml-[-25%] p-7 justify-center w-[10vh]">
          <Topbar />
        </div>

        <div className="flex space-x-4 z-20">
          <Dropdown title="Category" onSelectChange={handleSelectChange}>
            <option value="movie">Movies</option>
            <option value="tv">Series</option>
          </Dropdown>
        </div>
      </div>

      <div className="flex flex-wrap justify-center w-full gap-x-9 mt-10">
        {popular.map((c, i) => (
          <Link to={`/${c.media_type || category }/details/${c.id}`} key={i} className="w-[35vh] relative ">
            {" "}
            <div className="relative w-full"> 
            <img
              className="h-[45vh] object-cover hover:scale-[1.03] duration-200 mb-3 rounded-2xl"
              src={
                c.backdrop_path || c.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      c.backdrop_path || c.poster_path
                    }`
                  : noimage
              }
              alt=""
            />
           
            <div className="absolute bottom-[5%] right-[-8%] rounded-full h-[6vh] w-[6vh] flex items-center justify-center text-xl z-8 bg-yellow-500 text-white font-semibold">
             {(c.vote_average * 10).toFixed()}<sup>%</sup>
            </div>
            </div>
            <h1 className="text-xl mb-7 font-black hover:text-[#6556CD]">
              {c.name || c.title || c.original_name || c.original_title}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  ):(
    <h1 className="text-white bg-black font-black flex items-center justify-center text-5xl h-screen w-screen">
      <Loading />
    </h1>
  );
};

export default Popular;
