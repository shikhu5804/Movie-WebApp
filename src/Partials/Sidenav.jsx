import React from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <div className=" w-[20.5%] bg-[#111827]  h-screen border-r-2 border-zinc-400 p-5 fixed">
      <h1 className="text-3xl text-white font-bold gap-5 flex">
        <i className="text-[#6556CD] ri-tv-fill"></i>
        <span className="font-black ">SHIKHAR</span>
      </h1>

      <nav className="flex flex-col text-zinc-400 text-l gap-2 ">
        <h1 className="text-white text-2xl  font-bold mt-8  ">New Feeds</h1>

        <nav className="flex flex-col">
          <Link to="/trending" className="text-zinc-400 hover:bg-[#6556CD] hover:p-6 hover:text-white duration-300 rounded-lg p-5">
            <i className="mr-2 text-2xl ri-fire-line"></i>Trending
          </Link>
          <Link to="/popular" className="text-zinc-400 hover:bg-[#6556CD]  hover:p-6 hover:text-white duration-300 rounded-lg p-5">
            <i className="mr-2 text-2xl ri-bard-line"></i>Popular
          </Link>
          <Link to="/movie" className="text-zinc-400 hover:bg-[#6556CD] hover:p-6 hover:text-white duration-300 rounded-lg p-5">
            <i className="mr-2 text-2xl ri-movie-2-line"></i>Movies
          </Link>
          <Link to="/tv" className="text-zinc-400 hover:bg-[#6556CD] hover:p-6 hover:text-white duration-300 rounded-lg p-5">
            <i className="mr-2 text-2xl ri-tv-2-line"></i>TV Shows
          </Link>
          <Link to="/people" className="mb-1 text-zinc-400 hover:bg-[#6556CD] hover:p-6 hover:text-white duration-300 rounded-lg p-5">
            <i className="mr-2 text-2xl ri-team-line"></i>People
          </Link>
        </nav>
      </nav>
      <hr className="border-none h-[1px] bg-zinc-500" />
      <h1 className="text-white text-2xl  font-bold mt-6 ">
        Website Information
      </h1>
      <nav className="flex flex-col mt-2">
        <Link to="/contact" className="text-zinc-400 hover:bg-[#6556CD] hover:p-6 hover:text-white duration-300 rounded-lg p-5">
          <i className="mr-2 text-2xl ri-contacts-line"></i>Contact Shikhar
        </Link>
        <Link className="text-zinc-400 hover:bg-[#6556CD] hover:p-6 hover:text-white duration-300 rounded-lg p-5">
          <i className="mr-2 text-2xl ri-info-i"></i>About Us
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
