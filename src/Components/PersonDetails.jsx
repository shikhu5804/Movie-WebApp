import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncloadperson, removeperson } from "../Store/Actions/PersonActions";
import Horcards from "../Partials/Horcards";
import Loading from "../Partials/Loading";

const PersonDetails = () => {
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
  return info ? (
    <div className="h-[100vh] bg-[#1F1E24] overflow-auto w-full p-5">
      {/* Topbar */}
      <nav className="flex items-center justify-between mb-2 px-6 bg-black/5  text-xl text-white">
        {/* Back Button */}
        <div className="flex gap-10">
          <i
            onClick={() => navigate(-1)}
            className="text-zinc-300 text-3xl hover:text-[#6556CD] ri-arrow-left-line cursor-pointer transition duration-300"
          ></i>

          {/* Logo or Home Icon */}
          <i
            onClick={() => navigate("/")} // Navigating to the homepage
            className="text-zinc-300 text-3xl hover:text-[#6556CD] ri-home-4-line cursor-pointer transition duration-300"
            title="Go to Home"
          ></i>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row w-full">
        {/* Left Section */}
        <div className="mt-5 lg:w-[20%] flex-col mb-5">
          <img
            className="h-[60vh] w-[50vh] hover:scale-105 shadow-lg object-cover duration-150 mb-3 rounded-2xl"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt={info.detail.title}
          />
          <hr className="border-none h-[1px] bg-zinc-500" />
          <div className="text-white flex gap-5 items-center justify-center px-5 text-2xl mt-5 mb-5">
            <a
              className="inline-block hover:scale-110"
              title="Instagram"
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}/?hl=en`}
            >
              {" "}
              <i class=" ri-instagram-line"></i>
            </a>

            <a
              className="inline-block hover:scale-110"
              title="Instagram"
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}/?hl=en`}
            >
              {" "}
              <i class=" ri-facebook-line"></i>
            </a>

            <a
              className="inline-block hover:scale-110"
              title="Wikidata"
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill "></i>
            </a>

            <a
              className="inline-block hover:scale-110"
              title="Twitter"
              target="_blank"
              href={`https://x.com/${info.externalid.twitter_id}`}
            >
              <i class="ri-twitter-x-line"></i>
            </a>

            <a
              title="Wikidata"
              target="_blank"
              href={`https://www.imdb.com/name/${info.externalid.imdb_id}`}
            >
              <img
                className="w-[9vh] rounded-md hover:scale-105"
                src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
                alt="IMDB Logo"
              />
            </a>
          </div>

          <div>
            <h1 className="text-3xl text-zinc-200 font-bold mt-8 ">
              Person Info
            </h1>

            <h1 className="text-lg text-zinc-300 font-bold mt-5">Known For:</h1>

            <h1 className="font-semibold text-zinc-400 ">
              {info.detail.known_for_department}
            </h1>

            <h1 className="text-lg text-zinc-300 font-bold mt-5">Gender:</h1>

            <h1 className="font-semibold text-zinc-400 ">
              {info.detail.gender === 2 ? "Male" : "Female"}
            </h1>

            <h1 className="text-lg text-zinc-300 font-bold mt-5">
              Date of Birth:
            </h1>

            <h1 className="font-semibold text-zinc-400 ">
              {info.detail.birthday}
            </h1>

            <h1 className="text-lg text-zinc-300 font-bold mt-5">
              Death Date:
            </h1>

            <h1 className="font-semibold text-zinc-400 ">
              {info.detail.deathday ? info.detail.deathday : "Still Alive"}
            </h1>

            <h1 className="text-lg text-zinc-300 font-bold mt-5">
              Place of Birth:
            </h1>

            <h1 className="font-semibold text-zinc-400 ">
              {info.detail.place_of_birth}
            </h1>

            <h1 className="text-lg text-zinc-300 font-bold mt-5">
              Also Known as:
            </h1>

            <h1 className="font-semibold text-zinc-400 ">
              {info.detail.also_known_as.join(", ")}
            </h1>
          </div>
        </div>
        <div className="w-[70%] mt-2 ml-[5%]">
          <h1 className="text-6xl text-white font-black mb-1">
            {info.detail.name}
          </h1>
          <h1 className="text-xl mt-6 font-bold text-zinc-300">Biography</h1>
          <p className="text-zinc-400 font-semibold mt-2">
            {info.detail.biography}
          </p>
          <h1 className="text-xl mt-6 mb-5 font-bold text-zinc-300">Credits</h1>
          <Horcards trending={info.combinedcredits.cast} customWidth="min-w-[20%]"/>
          
        </div>
      </div>
    </div>
  ) : (
    <h1 className="text-white bg-zinc-800 font-black flex items-center justify-center text-5xl h-screen w-screen">
      <Loading />
    </h1>
  );
};

export default PersonDetails;
