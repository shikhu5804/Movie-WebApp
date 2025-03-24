import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Topbar from "../Partials/Topbar";
import axios from "../Utiliss/axios";
import noimage from "/noimage.png";
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

  useEffect(() => {
    getPeople(category);
  }, [category]);

  return people.length > 0 ? (
    <>
      <Topbar />
      <div className="w-full pb-[5vh] min-h-[screen] px-4 sm:px-8 lg:px-16 overflow-x-hidden text-white pt-[10vh]">
        <div className="flex gap-2 items-center mb-10">
          <i
            onClick={() => navigate(-1)}
            className="text-zinc-400 text-2xl hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
          />
          <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-zinc-400">
            Popular Peoples 
          </h1>
        </div>

        <div className="grid gap-6 sm:gap-12 md:gap-12 lg:gap-14 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {people.map((c, i) => (
            <Link
              to={`/person/details/${c.id}`}
              key={i}
              className="group duration-500 transition-transform transform hover:translate-y-[-10px]"
            >
              <img
                className="w-full h-[40vh] sm:h-[45vh] md:h-[50vh] object-cover rounded-2xl shadow-lg"
                src={
                  c.backdrop_path || c.profile_path || c.poster_path
                    ? `https://image.tmdb.org/t/p/original/${
                        c.backdrop_path || c.poster_path || c.profile_path
                      }`
                    : noimage
                }
                alt={c.name || "Person"}
              />
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

export default People;
