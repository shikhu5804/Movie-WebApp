import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../Partials/Topbar";
import Dropdown from "../Partials/Dropdown";
import { useState } from "react";
import axios from "../Utiliss/axios";
import noimage from "/noimage.png";
import { Link } from "react-router-dom";
import Loading from "../Partials/Loading";


const People = () => {
  document.title = "People";


  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [people, setPeople] = useState([]);

  const getPeople = async (cat) => {
    try {
      const { data } = await axios.get(`/person/${cat}`);
      setPeople(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  console.log(people);

  useEffect(() => {
    getPeople(category);
  }, [category]);

  const handleSelectChange = (value) => {
    setCategory(value);
  };


  


  return people.length>0 ? (
    <div className="w-screen h-screen px-8 text-white overflow-auto">
      <div className="w-full h-[10vh] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <i
            onClick={() => navigate(-1)}
            className="text-zinc-400 text-2xl relative z-40 hover:text-[#6556CD] ri-arrow-left-line mt-1 cursor-pointer"
          ></i>
          
          <h1 className="font-bold text-2xl text-zinc-400">people ({category})</h1>
        </div>

        <div className="flex-1 flex backdrop-blur-0 bg-transparent ml-[-20%] z-10 p-7 justify-center ">
          <Topbar />
        </div>

        <div className="flex space-x-4">
          
        </div>
      </div>

      <div className="flex flex-wrap justify-center w-full gap-x-7 mt-10">
        {people.map((c, i) => (
          <Link to={`/person/details/${c.id}`} key={i} className="w-[35vh]  ">
            {" "}
            <img
              className="h-[45vh] object-cover hover:scale-105 duration-150 mb-3 rounded-2xl"
              src={
                c.backdrop_path || c.profile_path || c.poster_path
                  ? `https://image.tmdb.org/t/p/original/${
                      c.backdrop_path || c.poster_path || c.profile_path
                    }`
                  : noimage
              }
              alt=""
            />
            
            <h1 className="text-xl mb-7 font-black hover:text-[#6556CD]">
              {c.name || c.title || c.original_name || c.original_title}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  ):<h1><Loading /></h1>;
};

export default People;
 