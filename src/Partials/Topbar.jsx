import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../Utiliss/axios";
import noimage from "/noimage.png";

const Topbar = ({ isHome, setLoading }) => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div
        className="absolute top-0 left-0 z-[200] w-[100%] h-[8vh] text-white flex items-center justify-between"
        style={{
          backgroundColor: isHome
            ? "linear-gradient(rgba(0, 0, 0, .2), rgba(0, 0, 0, .5), rgba(0, 0, 0, .8)) rgba(0.1, 0.1, 0.1, 0.2)"
            : "transparent",
        }}
      >
        <div className="ml-5 flex gap-3 items-center">
          <Link to="/">
            <img
              className="w-[15vh] min-w-[100px] h-auto" // Smaller size
              src="/final-logo.png"
              alt=""
            />
          </Link>

          {/* Desktop Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex gap-3 items-center">
            <Link
              to="/trending"
              className="text-white text-sm font-semibold hover:text-zinc-300 duration-300 rounded-lg p-3"
            >
              Trending
            </Link>
            <Link
              to="/popular"
              className="text-white text-sm font-semibold hover:text-zinc-300 duration-300 rounded-lg p-3"
            >
              Popular
            </Link>
            <Link
              to="/movie"
              className="text-white text-sm font-semibold hover:text-zinc-300 duration-300 rounded-lg p-3"
            >
              Movies
            </Link>
            <Link
              to="/tv"
              className="text-white text-sm font-semibold hover:text-zinc-300 duration-300 rounded-lg p-3"
            >
              TV Series
            </Link>
            <Link
              to="/people"
              className="text-zinc-100 text-sm font-semibold hover:text-zinc-300 duration-300 rounded-lg p-3"
            >
              People
            </Link>
          </div>
        </div>

        <div className=" sm:flex w-[100vh] items-center justify-end">
          <div className="relative w-[100%] md:w-[80%] mx-2 flex items-center">
            <div className="relative flex items-center w-full">
              <i className="ri-search-line text-xl absolute left-3 text-gray-300"></i>

              <input
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                className="bg-transparent mr-2 text-white font-bold w-full rounded-2xl text-sm pl-10 pr-10 py-2 border-2 border-purple-300 duration-300"
                type="text"
                placeholder="Search Anything"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 text-gray-300 hover:text-white focus:outline-none"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              )}
            </div>
          </div>

          {search.length > 0 && (
            <div
              className={`absolute overflow-auto overflow-x-hidden flex-col ${
                windowWidth > 768 ? "w-[45%]" : "w-[85%]"
              } max-h-[50vh] top-[100%] left-1/2 transform -translate-x-1/2 md:translate-x-0 rounded bg-zinc-300 z-[300] shadow-lg`}
            >
              {search.map((s, i) => (
                <Link
                  to={`/${s.media_type || "movie"}/details/${s.id}`}
                  key={i}
                  className="hover:text-[#6556CD] text-zinc-500 duration-300 border-b-2 hover:bg-zinc-100 border-zinc-500 flex items-center justify-start h-[12vh] w-full p-5"
                >
                  <img
                    className="mr-5 w-[8vh] h-[8vh] object-cover rounded shadow-lg"
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

          <div className="hidden lg:flex">
            <Link
              to="/contact"
              className="text-white text-sm font-semibold hover:text-zinc-300 duration-300 rounded-lg p-3"
            >
              Contact
            </Link>
            <Link
              to="/about_me"
              className="text-white text-sm font-semibold hover:text-zinc-300 duration-300 rounded-lg p-3"
            >
              About
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button - Visible only on mobile */}
        <button
          className="md:hidden mr-4 text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <i
            className={`ri-${
              isMobileMenuOpen ? "close" : "menu"
            }-line text-3xl`}
          ></i>
        </button>
      </div>

      {/* Mobile Menu - Slides down when open */}
      {isMobileMenuOpen && (
        <div className="absolute top-[8vh] left-0 z-[199] w-full bg-black bg-opacity-90 backdrop-blur-sm md:hidden">
          <div className="flex flex-col p-4">
            <Link
              to="/trending"
              className="text-white text-sm font-semibold hover:text-zinc-300 duration-300 rounded-lg p-3"
              onClick={toggleMobileMenu}
            >
              Trending
            </Link>
            <Link
              to="/popular"
              className="text-white text-sm font-semibold hover:text-zinc-300 duration-300 rounded-lg p-3"
              onClick={toggleMobileMenu}
            >
              Popular
            </Link>
            <Link
              to="/movie"
              className="text-white text-sm font-semibold hover:text-zinc-300 duration-300 rounded-lg p-3"
              onClick={toggleMobileMenu}
            >
              Movies
            </Link>
            <Link
              to="/tv"
              className="text-white text-sm font-semibold hover:text-zinc-300 duration-300 rounded-lg p-3"
              onClick={toggleMobileMenu}
            >
              TV Series
            </Link>
            <Link
              to="/people"
              className="text-zinc-100 text-sm font-semibold hover:text-zinc-300 duration-300 rounded-lg p-3"
              onClick={toggleMobileMenu}
            >
              People
            </Link>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <Link
                to="/contact"
                className="text-white text-sm font-semibold hover:text-zinc-300 duration-300 rounded-lg p-3 block"
                onClick={toggleMobileMenu}
              >
                Contact
              </Link>
              <Link
                to="/about_me"
                className="text-white text-sm font-semibold hover:text-zinc-300 duration-300 rounded-lg p-3 block"
                onClick={toggleMobileMenu}
              >
                About
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;
