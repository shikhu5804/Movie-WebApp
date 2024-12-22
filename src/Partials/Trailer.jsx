import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Trailer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);

  // Check if ytvideo exists and has a valid key
  const hasTrailer = ytvideo && ytvideo.key && ytvideo.key.length > 0;

  return hasTrailer ? (
    <div className="text-white overflow-hidden w-full h-full bg-[rgba(0,0,0,.9)] fixed z-20 top-0 left-0 flex justify-center items-center">
      <i
        onClick={() => navigate(-1)}
        className="text-zinc-300 absolute top-10 right-20 text-3xl hover:text-[#6556CD] ri-close-line cursor-pointer transition duration-300"
      ></i>
      <ReactPlayer
        controls={true}
        height={600}
        width={1200}
        url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
      />
    </div>
  ) : (
    <h1 className="text-white w-full h-full bg-[rgba(0,0,0,.9)] fixed z-20 top-0 left-0 flex items-center justify-center">
       <i
        onClick={() => navigate(-1)}
        className="text-zinc-300 absolute top-10 right-20 text-3xl hover:text-[#6556CD] ri-close-line cursor-pointer transition duration-300"
      ></i>
      <img src="https://i.pinimg.com/originals/88/4f/6b/884f6bbb75ed5e1446d3b6151b53b3cf.gif" alt="" />
    </h1>
  );
};

export default Trailer;
