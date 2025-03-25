import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadmovie, removemovie } from "../Store/Actions/MovieActions";
import Horcards from "../Partials/Horcards";
import Loading from "../Partials/Loading";
import noimage from "/noimage.png";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.movie);
  const { id } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);

  useEffect(() => {
    if (info && info.detail) {
      document.title = `${info.detail.title || info.detail.original_title}`;
    }
  }, [info]);

  return info ? (
    <div
      className="h-[100vh] relative overflow-auto w-full p-5"
      style={{
        background: ` linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .6), rgba(0, 0, 0, .8)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Topbar */}
      <nav className="flex flex-wrap items-center justify-between py-4 px-4 sm:px-6 bg-black/5 text-white">
        {/* Back & Home Buttons */}
        <div className="flex items-center gap-6">
          <i
            onClick={() => navigate(-1)}
            className="text-zinc-300 text-3xl hover:text-[#6556CD] ri-arrow-left-line cursor-pointer transition duration-300"
          ></i>

          <i
            onClick={() => navigate("/")}
            className="text-zinc-300 text-3xl hover:text-[#6556CD] ri-home-4-line cursor-pointer transition duration-300"
            title="Go to Home"
          ></i>
        </div>

        {/* External Links */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            target="_blank"
            title="Website"
            href={info.detail.homepage}
            className="hover:scale-105 transition-transform duration-300"
          >
            <img
              className="w-[6vh] sm:w-[7vh] rounded-md"
              src="https://cdn-icons-png.freepik.com/512/1927/1927746.png?ga=GA1.1.1925957040.1723322691"
              alt="Website"
              loading="lazy"
            />
          </a>

          <a
            title="Wikidata"
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            className="hover:scale-105 transition-transform duration-300"
          >
            <img
              className="w-[5vh] sm:w-[6vh] rounded-md"
              src="https://cdn-icons-png.freepik.com/512/2274/2274790.png?ga=GA1.1.1925957040.1723322691"
              alt="Wikidata"
              loading="lazy"
            />
          </a>

          <a
            title="IMDb"
            target="_blank"
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
            className="hover:scale-105 transition-transform duration-300"
          >
            <img
              className="w-[7vh] sm:w-[9vh] rounded-md"
              src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
              alt="IMDb"
              loading="lazy"
            />
          </a>
        </div>
      </nav>
      {/* Content Sections */}
      <div className="flex flex-col w-[100%] lg:flex-row gap-5">
        {/* Left Section */}
        <div className="mt-5 lg:w-[25%] flex-col mb-2">
          <img
            className="h-[50vh] w-[50vh] hover:scale-[1.01] duration-200 shadow-lg object-cover  mb-3 rounded-2xl"
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
                    key={w.provider_id} // Add key here
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
                    key={w.provider_id} // Add key here
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
                    key={w.provider_id} // Add key here
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
        <div className="lg:w-[70%] mt-1 ">
          <h1 className="text-4xl md:text-5xl text-white font-black mb-1">
            {info.detail.title || info.detail.original_title}
            <small className="text-zinc-200 text-2xl font-black">
              ({info.detail.release_date.split("-")[0]})
            </small>
          </h1>
          <h1 className="text-zinc-200 text-sm md:text-lg font-semibold italic">
            {info.detail.tagline}
          </h1>
          <div className="flex items-center gap-8 mt-5">
            {/* Percentage Circle */}
            <div className="rounded-full h-[50px] w-[50px] flex-shrink-0 mr-1 flex items-center justify-center font-black bg-yellow-600 text-white text-sm">
              {(info.detail.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>

            {/* Info Section */}
            <div className="text-white md:gap-8 flex flex-col md:flex-row text-sm md:text-lg leading-5">
              <p>
                <span className="font-bold">Released:</span>{" "}
                {info.detail.release_date}
              </p>

              <p>
                <span className="font-bold">Genres:</span>{" "}
                {info.detail.genres.map((g, index) => (
                  <span key={g.id}>
                    {index > 0 ? `, ` : ``}
                    {g.name}
                  </span>
                ))}
              </p>

              <p>
                <span className="font-bold">Runtime:</span>{" "}
                {info.detail.runtime} mins
              </p>
            </div>
          </div>

          <h1 className="font-black text-white mt-4 text-3xl">Overview</h1>
          <p className="text-zinc-200 font-semibold mt-3">
            {info.detail.overview}
          </p>
          <h1 className="font-black text-white mt-4 hidden md:block text-3xl">
            Available in Languages
          </h1>
          <p className="text-zinc-200 font-semibold hidden md:block mt-3 mb-8">
            {info.translations.join(", ")}
          </p>
          <div className="flex gap-10">
            <div className="mb-10 mt-10 md:mt-0">
              <Link
                to={`${pathname}/trailer`}
                className="hover:text-white text-zinc-200 font-bold  p-4 rounded-xl bg-[#6556CD]"
              >
                <i className="ri-play-fill mr-2"></i>
                Watch Trailer
              </Link>
            </div>
            <div className="mb-10 mt-10 md:mt-0 ">
              <Link
                to={`${pathname}/stream`}
                className="hover:text-white text-zinc-200 font-bold p-4 rounded-xl bg-yellow-600"
              >
                <i className="ri-play-fill mr-2"></i>
                Stream{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Casts */}
      <hr className="border-none h-[1px] bg-zinc-300" />
      {info.credits.cast.length > 0 && (
        <div className="px-4 sm:p-5">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-2xl sm:text-3xl font-black mb-3 sm:mb-4">
              Casts
            </h1>
          </div>
          <div className="w-full text-white mb-4 overflow-x-auto overflow-y-hidden">
            <div
              className="flex gap-4 sm:gap-6 pb-4"
              style={{ minWidth: `${info.credits.cast.length * 150}px` }}
            >
              {info.credits.cast.map((c) => (
                <Link
                  key={c.id}
                  to={`/person/details/${c.id}`}
                  className="w-[150px] sm:w-[180px] min-w-[150px]  sm:min-w-[220px] flex-shrink-0"
                >
                  <div className="transform hover:scale-105 transition-transform duration-300 h-full">
                    <div className="flex flex-col backdrop-blur-3xl shadow-lg rounded-2xl overflow-hidden h-full">
                      <img
                        className="h-[160px] sm:h-[220px] w-full object-cover"
                        src={
                          c.profile_path
                            ? `https://image.tmdb.org/t/p/original/${c.profile_path}`
                            : noimage
                        }
                        alt={c.name}
                        loading="lazy"
                        style={{ objectPosition: "center 20%" }}
                      />
                      <div className="p-3 sm:p-4 flex-grow">
                        <h1 className="text-lg font-bold sm:text-md sm:font-black mb-1 sm:mb-2 line-clamp-2">
                          {c.name}
                        </h1>
                        <p className="text-zinc-200 text-sm line-clamp-2">
                          {c.character}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      <hr className="border-none h-[1px] bg-zinc-300 mb-8" />
      {/* Recommendations or Similar Movies */}
      <h1 className="text-white text-3xl font-black mb-4">
        Recommendations & Similars
      </h1>{" "}
      {(info.recommendations.length > 0 || info.similar.length > 0) && (
        <Horcards
          trending={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
        />
      )}
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
