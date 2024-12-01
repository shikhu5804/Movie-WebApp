import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncloadtv, removetv } from "../Store/Actions/TvActions";
import Horcards from "../Partials/Horcards";
import Loading from "../Partials/Loading";
import noimage from "/noimage.png";

const TvDetails = () => {
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.tv);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);

  useEffect(() => {
    if (info && info.detail) {
      document.title = `${info.detail.original_name} - Tv Details`;
    }
  }, [info]);

  return info ? (
    <div
      className="h-[100vh] overflow-auto w-full p-5"
      style={{
        background: ` linear-gradient(rgba(0, 0, 0, .2), rgba(0, 0, 0, .5), rgba(0, 0, 0, .8)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
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

        {/* External Links */}
        <div className="flex gap-6 items-center">
          {/* Website Link */}
          <a target="_blank" title="Website" href={info.detail.homepage}>
            <i className="ri-earth-fill text-2xl hover:text-[#6556CD] transition duration-300"></i>
          </a>

          {/* Wikidata Link */}
          <a
            title="Wikidata"
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          >
            <i className="ri-external-link-line text-2xl hover:text-[#6556CD] transition duration-300"></i>
          </a>

          {/* IMDb Link */}
          <a
            title="Wikidata"
            target="_blank"
            href={`https://www.imdb.com/name/${info.externalid.imdb_id}`}
          >
            <img
              className="w-[9vh] rounded-md"
              src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
              alt="IMDB Logo"
            />
          </a>
        </div>
      </nav>

      {/* Content Sections */}
      <div className="flex flex-col lg:flex-row w-full">
        {/* Left Section */}
        <div className="mt-5 lg:w-[40%] flex-col mb-5">
          <img
            className="h-[50vh] w-[50vh] hover:scale-105 shadow-lg object-cover duration-150 mb-3 rounded-2xl"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.backdrop_path || info.detail.poster_path
            }`}
            alt={info.detail.title}
          />
          {/* Watch Providers */}
          <div className="flex flex-col">
            {info.watchproviders?.rent && (
              <div className="flex items-center gap-2 text-white mt-3">
                <h1>Available on Rent:</h1>
                {info.watchproviders.rent.map((w) => (
                  <img
                    key={w.provider_id}
                    title={w.provider_name}
                    className="w-[5vh] h-[5vh] object-cover rounded-md"
                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  />
                ))}
              </div>
            )}
            {info.watchproviders?.buy && (
              <div className="flex items-center gap-2 text-white mt-3">
                <h1>Available to Buy:</h1>
                {info.watchproviders.buy.map((w) => (
                  <img
                    key={w.provider_id}
                    title={w.provider_name}
                    className="w-[5vh] h-[5vh] object-cover rounded-md"
                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  />
                ))}
              </div>
            )}
            {info.watchproviders?.flatrate && (
              <div className="flex items-center gap-2 text-white mt-3">
                <h1>Available on Platforms:</h1>
                {info.watchproviders.flatrate.map((w) => (
                  <img
                    key={w.provider_id}
                    title={w.provider_name}
                    className="w-[5vh] h-[5vh] object-cover rounded-md"
                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-[70%] mt-2 ml-[-12%]">
          <h1 className="text-5xl text-white font-black mb-1">
            {info.detail.original_name}
            <small className="text-zinc-200 text-2xl font-black">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>
          <h1 className="text-zinc-200 font-semibold italic">
            {info.detail.tagline}
          </h1>
          <div className="flex items-center gap-10 mt-5">
            <div className="rounded-full h-[6vh] w-[6vh] flex items-center justify-center font-black bg-yellow-500 text-white">
              {(info.detail.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
            <div className="flex flex-wrap gap-8 text-xl text-white font-semibold">
              <h1>
                <span className="underline italic">Released Date:</span>
                <span className="font-black">
                  {" "}
                  {info.detail.first_air_date}
                </span>
              </h1>
              <h1 className="font-black">
                {info.detail.genres.map((g) => g.name).join(", ")}
              </h1>
            </div>
          </div>
          <h1 className="font-black text-white mt-4 text-3xl">Overview</h1>
          <p className="text-zinc-200 font-semibold mt-3">
            {info.detail.overview}
          </p>
          <h1 className="font-black text-white mt-4 text-3xl">
            Available in Languages
          </h1>
          <p className="text-zinc-200 font-semibold mt-3 mb-8">
            {info.translations.join(", ")}
          </p>
          <div className="mb-10">
            <Link className="hover:text-white text-zinc-200 font-semibold p-4 rounded-xl bg-[#6556CD]">
              <i className="ri-play-fill mr-2"></i>
              Watch Trailer
            </Link>
          </div>
        </div>
      </div>

      {/* Seasons */}
      <hr className="border-none h-[1px] bg-zinc-300" />

      <div className="p-5 mb-3">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-3xl font-black mb-4">Seasons</h1>
        </div>

        <div className="w-full text-white overflow-x-auto overflow-y-hidden flex gap-x-6 pb-4">
          {info.detail.seasons.map((s, i) => (
            <div
              key={i}
              className="min-w-[15vw] max-w-[15vw]  transform hover:scale-105 transition-transform duration-300"
            >
              <div className="flex flex-col bg-zinc-800 shadow-lg rounded-2xl overflow-hidden">
                <img
                  className="h-[40vh] w-full object-cover"
                  src={
                    s.poster_path
                      ? `https://image.tmdb.org/t/p/original/${s.poster_path}`
                      : `https://image.tmdb.org/t/p/original/${
                          info.detail.backdrop_path || info.detail.poster_path
                        }`
                  }
                  alt={s.name}
                />
                <div className="p-4">
                  <h1 className="text-xl sm:text-2xl font-black mb-2">
                    {s.name}
                  </h1>
                  <p className="text-zinc-400 text-sm">
                    Episodes: {s.episode_count}
                  </p>
                  <p className="text-zinc-400 text-sm">
                    Air Date: {s.air_date || "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <hr className="border-none h-[1px] bg-zinc-300" />
      <div className="p-5 ">
      <div className="flex justify-between items-center">
          <h1 className="text-white text-3xl font-black mb-2">Recommendations & Similars</h1>
        </div>
        {info.recommendations && (
          <Horcards
            trending={
              info.recommendations.length > 0
                ? info.recommendations
                : info.similar
            }
          />
        )}
      </div>
    </div>
  ) : (
    <h1 className="text-white bg-zinc-800 font-black flex items-center justify-center text-5xl h-screen w-screen">
      <Loading />
    </h1>
  );
};

export default TvDetails;
