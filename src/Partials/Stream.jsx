import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const Stream = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const imdb = useSelector((state) => state[category].info.externalid.imdb_id);
  const [loading, setLoading] = useState(true);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  return (
    <div className="text-white overflow-hidden w-full h-full bg-[rgba(0,0,0,.9)] fixed z-20 top-0 left-0 flex justify-center items-center">
      
      {/* Close Button */}
      <i
        onClick={() => navigate(`/${category}/details/${id}`)}
        className="text-zinc-300 absolute top-6 right-6 sm:top-10 sm:right-20 text-3xl hover:text-[#6556CD] ri-close-line cursor-pointer transition duration-300 z-30"
      ></i>

      {loading && <Loading />}

      {/* Responsive Iframe */}
      <div className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] h-[70vh] sm:h-[75vh] md:h-[80vh] lg:h-[85vh] flex justify-center items-center">
        <iframe
          src={`https://vidsrc.me/embed/${category}/${imdb}`}
          referrerPolicy="origin"
          frameBorder="0"
          allowFullScreen
          className="w-full h-full rounded-xl shadow-lg"
          onLoad={handleIframeLoad}
        ></iframe>
      </div>
    </div>
  );
};

export default Stream;
