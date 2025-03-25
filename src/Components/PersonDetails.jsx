import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncloadperson, removeperson } from "../Store/Actions/PersonActions";
import Horcards from "../Partials/Horcards";
import Loading from "../Partials/Loading";
import Dropdown from "../Partials/Dropdown";

const PersonDetails = () => {
  const [category, setCategory] = useState("movie");
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.person);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  const handleSelectChange = (value) => {
    setCategory(value);
  };

  useEffect(() => {
    if (info && info.detail && info.detail.name) {
      document.title = `${info.detail.name}`;
    }
  }, [info]);

  return info ? (
    <div className="min-h-[100vh] bg-[#1F1E24] w-full p-2 sm:p-5">
      {/* Topbar */}
      <nav className="flex items-center justify-between mb-2 px-3 sm:px-6 bg-black/5 text-xl text-white">
        {/* Back Button */}
        <div className="flex gap-5 sm:gap-10">
          <i
            onClick={() => navigate(-1)}
            className="text-zinc-300 text-2xl sm:text-3xl hover:text-[#6556CD] ri-arrow-left-line cursor-pointer transition duration-300"
          ></i>

          {/* Logo or Home Icon */}
          <i
            onClick={() => navigate("/")}
            className="text-zinc-300 text-2xl sm:text-3xl hover:text-[#6556CD] ri-home-4-line cursor-pointer transition duration-300"
            title="Go to Home"
          ></i>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row w-full">
        {/* Left Section */}
        <div className="mt-5 w-full lg:w-[20%] flex flex-col items-center lg:items-start mb-5">
          <img
            className="h-[40vh] sm:h-[60vh] w-auto sm:w-[50vh] hover:scale-[1.009] shadow-lg object-cover duration-150 mb-3 rounded-2xl"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt={info.detail.title}
          />
          <hr className="border-none h-[1px] w-full bg-zinc-500" />
          <div className="text-white flex flex-wrap gap-3 sm:gap-5 items-center justify-center px-2 sm:px-5 text-xl sm:text-2xl mt-5 mb-5">
            <a
              className="inline-block hover:scale-110"
              title="Instagram"
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}/?hl=en`}
            >
              {" "}
              <i className="ri-instagram-line"></i>
            </a>

            <a
              className="inline-block hover:scale-110"
              title="Instagram"
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}/?hl=en`}
            >
              {" "}
              <i className="ri-facebook-line"></i>
            </a>

            <a
              className="inline-block hover:scale-110"
              title="Wikidata"
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>

            <a
              className="inline-block hover:scale-110"
              title="Twitter"
              target="_blank"
              href={`https://x.com/${info.externalid.twitter_id}`}
            >
              <i className="ri-twitter-x-line"></i>
            </a>

            <a
              title="Wikidata"
              target="_blank"
              href={`https://www.imdb.com/name/${info.externalid.imdb_id}`}
            >
              <img
                className="w-[7vh] sm:w-[9vh] rounded-md hover:scale-105"
                src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
                alt="IMDB Logo"
              />
            </a>
          </div>

          <div className="w-full px-2 sm:px-0">
            <h1 className="text-2xl sm:text-3xl text-zinc-200 font-bold mt-5 sm:mt-8">
              Person Info
            </h1>

            <h1 className=" sm:text-lg text-zinc-300 font-bold mt-3 sm:mt-5">
              Known For:
            </h1>

            <h1 className="font-semibold text-md text-zinc-400">
              {info.detail.known_for_department}
            </h1>

            <h1 className=" sm:text-lg text-zinc-300 font-bold mt-3 sm:mt-5">
              Gender:
            </h1>

            <h1 className="font-semibold text-md text-zinc-400">
              {info.detail.gender === 2 ? "Male" : "Female"}
            </h1>

            <h1 className=" sm:text-lg text-zinc-300 font-bold mt-3 sm:mt-5">
              Date of Birth:
            </h1>

            <h1 className="font-semibold text-md  text-zinc-400">
              {info.detail.birthday}
            </h1>

            <h1 className=" sm:text-lg text-zinc-300 font-bold mt-3 sm:mt-5">
              Death Date:
            </h1>

            <h1 className="font-semibold text-md text-zinc-400">
              {info.detail.deathday ? info.detail.deathday : "Still Alive"}
            </h1>

            <h1 className=" sm:text-lg text-zinc-300 font-bold mt-3 sm:mt-5">
              Place of Birth:
            </h1>

            <h1 className="font-semibold text-md text-zinc-400">
              {info.detail.place_of_birth}
            </h1>

            <h1 className=" sm:text-lg text-zinc-300 font-bold mt-3 sm:mt-5">
              Also Known as:
            </h1>

            <h1 className="font-semibold text-md text-zinc-400">
              {info.detail.also_known_as.join(", ")}
            </h1>
          </div>
        </div>
        <div className="w-full lg:w-[70%] mt-2 lg:ml-[5%] px-2 sm:px-0">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl text-white font-black mb-1">
            {info.detail.name}
          </h1>
          <div className="bg-zinc-800 mt-3 sm:mt-5 rounded shadow-lg px-3 sm:px-5 mb-2 p-3 sm:p-4">
            <h1 className="text-lg sm:text-xl mb-2 sm:mb-3 font-bold text-zinc-200">
              Biography
            </h1>
            <p className="text-md sm:text-md  text-zinc-400 font-semibold mt-1 sm:mt-2">
              {info.detail.biography ? info.detail.biography : "No Biography Available"}
            </p>
          </div>

          <h1 className="text-lg sm:text-xl mt-4 sm:mt-6 mb-3 sm:mb-5 font-bold text-zinc-300">
            Featured in
          </h1>
          <Horcards
            trending={info.combinedcredits.cast}
            customWidth="min-w-[40%] sm:min-w-[20%]"
            variant="people" 
          />
          <div className="flex justify-between items-center mt-4">
            <h1 className="text-white font-black text-xl sm:text-2xl">
              Credits
            </h1>
            <div className="space-x-2 sm:space-x-4 z-20">
              <Dropdown onSelectChange={handleSelectChange} title="Category">
                <option value="movie">Movies</option>
                <option value="tv">Series</option>
              </Dropdown>
            </div>
          </div>
          <div className="w-full h-[50vh] sm:h-[60vh] mt-2 mb-4 text-zinc-400 overflow-x-hidden overflow-y-auto shadow-2xl shadow-zinc-700 border-2 border-zinc-700 rounded-xl bg-[#1F1E24]">
            <ul className="space-y-3 sm:space-y-4 px-3 sm:px-6 py-3 sm:py-4">
              {info[category + "credits"].cast.map((c, i) => (
                <li
                  key={i}
                  className="hover:bg-zinc-800 hover:scale-[1.03] duration-500 hover:text-white cursor-pointer p-2 sm:p-4 rounded-lg"
                >
                  <Link
                    to={`/${category}/details/${c.id}`}
                    className="flex items-start justify-between gap-2 sm:gap-4 w-full h-full"
                  >
                    <div className="flex items-start gap-2 sm:gap-4">
                      <img
                        src={
                          c.poster_path
                            ? `https://image.tmdb.org/t/p/w92/${c.poster_path}`
                            : "/default-image-placeholder.jpg"
                        }
                        alt={c.name || c.title || "Image Not Available"}
                        className="w-[6vh] sm:w-[8vh] object-cover rounded-md shadow-md"
                      />
                      <div className="flex flex-col justify-start">
                        <p className=" sm:text-xl font-bold">
                          {c.name ||
                            c.title ||
                            c.original_name ||
                            c.original_title}
                        </p>
                        {c.character && (
                          <p className="text-xs sm:text-sm text-zinc-400 mt-0 sm:mt-1">
                            Character Name:{" "}
                            <span className="text-zinc-300">{c.character}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center text-zinc-300 text-sm sm:text-lg font-semibold">
                      {c.vote_average ? (
                        <span className="flex items-center bg-zinc-800 px-2 sm:px-3 py-0 sm:py-1 rounded-full shadow-sm">
                          ⭐ {c.vote_average.toFixed(1)}
                        </span>
                      ) : (
                        <span className="text-zinc-500">N/A</span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h1 className="text-white bg-black font-black flex items-center justify-center text-5xl h-screen w-screen">
      <Loading />
    </h1>
  );
};

export default PersonDetails;
