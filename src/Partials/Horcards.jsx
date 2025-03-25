import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.png";

const Horicards = ({ trending, variant = "default" }) => {
  const variants = {
    default: "backdrop-blur-3xl ", 
    people: "backdrop-brightness-75 ", 
  };

  return (
    <div className="mt-2 mb-9">
      <div className="w-full text-white overflow-x-auto overflow-y-hidden flex gap-x-6 pb-5">
        {trending.map((d, i) => (
          <Link
            key={i}
            to={`/${d.media_type}/details/${d.id}`}
            className="w-[150px] sm:w-[180px] min-w-[150px] sm:min-w-[220px] flex-shrink-0"
          >
            <div className="transform hover:scale-[1.02] transition-transform duration-300 h-full">
              <div className={`flex flex-col shadow-lg rounded-2xl overflow-hidden h-full ${variants[variant]}`}>
                {/* Image Section */}
                <img
                  className="h-[160px] sm:h-[220px] w-full object-cover"
                  src={
                    d.backdrop_path || d.poster_path
                      ? `https://image.tmdb.org/t/p/original/${
                          d.backdrop_path || d.poster_path
                        }`
                      : noimage
                  }
                  alt={d.title || d.name}
                  loading="lazy"
                />

                {/* Content Section */}
                <div className="p-3 sm:p-4 flex-grow">
                  <h1 className="text-lg font-bold sm:text-md sm:font-black mb-1 sm:mb-2 line-clamp-2">
                    {d.name || d.title || d.original_name || d.original_title}
                  </h1>
                  <p className="text-zinc-200 text-sm line-clamp-2">
                    {d.overview
                      ? d.overview.slice(0, 60) + (d.overview.length > 60 ? "..." : "")
                      : "No overview available"}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Horicards;