import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
      <i
        onClick={() => navigate(`/${category}/details/${id}`)}
        className="text-zinc-300 absolute top-10 right-20 text-3xl hover:text-[#6556CD] ri-close-line cursor-pointer transition duration-300"
      ></i>

      {loading && <Loading />}

      <iframe
        src={`https://vidsrc.me/embed/${category}/${imdb}`}
        referrerpolicy="origin"
        width="1200"
        height="600"
        frameBorder="0"
        allowFullScreen
        className="rounded-xl"
        onLoad={handleIframeLoad}
      ></iframe>
    </div>
  );
};

export default Stream;
