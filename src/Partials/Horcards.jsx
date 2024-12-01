import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.png";

const Horicards = ({ trending, customWidth }) => {
  return (
    <div className="mt-2 mb-9">
      {/* <div className="flex justify-between items-center">
        <h1 className="text-white text-3xl font-black mb-5">
          Recommendations & Similars
        </h1>
      </div> */}

      <div className="h-auto text-white overflow-x-auto overflow-y-hidden flex gap-x-6 pb-5">
        {trending.map((d, i) => (
          <div
            key={i}
            className={`min-w-[16%] hover:scale-105 transform transition-transform duration-200 ${customWidth || "min-w-[16%]"}`}
          >
            <Link
              to={`/${d.media_type}/details/${d.id}`}
              className="bg-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl block min-h-[50vh]  flex-col"
            >
              <img
                className="h-[30vh] w-full object-cover"
                src={
                  d.backdrop_path || d.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        d.backdrop_path || d.poster_path
                      }`
                    : noimage
                }
                alt={d.title || d.name}
              />
              <div className="p-4 flex-grow flex flex-col justify-between">
                <h1 className="text-lg font-black mb-2">
                  {d.name || d.title || d.original_name || d.original_title}
                </h1>
                <p className="text-sm text-zinc-400 line-clamp-4">
                  {d.overview
                    ? d.overview.slice(0, 80)
                    : "No overview available"}
                  {d.overview.length > 0 && (
                    <Link
                      to={`/${d.media_type}/details/${d.id}`}
                      className="text-blue-400 ml-1 hover:underline"
                    >
                      ...more
                    </Link>
                  )}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Horicards;
