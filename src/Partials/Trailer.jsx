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
      
      {/* Close Button */}
      <i
        onClick={() => navigate(-1)}
        className="text-zinc-300 absolute top-6 right-6 sm:top-10 sm:right-20 text-3xl hover:text-[#6556CD] ri-close-line cursor-pointer transition duration-300 z-30"
      ></i>

      {/* Responsive ReactPlayer */}
      <div className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] flex justify-center items-center">
        <ReactPlayer
          controls={true}
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
          width="100%"
          height="100%"
          className="rounded-xl shadow-lg"
        />
      </div>
      
    </div>
  ) : (
    <div className="text-white w-full h-full bg-[rgba(0,0,0,.9)] fixed z-20 top-0 left-0 flex items-center justify-center">
      
      {/* Close Button */}
      <i
        onClick={() => navigate(-1)}
        className="text-zinc-300 absolute top-6 right-6 sm:top-10 sm:right-20 text-3xl hover:text-[#6556CD] ri-close-line cursor-pointer transition duration-300 z-30"
      ></i>
      
      {/* No Trailer GIF */}
      <img
        src="https://i.pinimg.com/originals/88/4f/6b/884f6bbb75ed5e1446d3b6151b53b3cf.gif"
        alt="No Trailer Available"
        className="w-[70%] sm:w-[50%] md:w-[40%] lg:w-[30%] rounded-lg shadow-lg"
      />
    </div>
  );
};

export default Trailer;
