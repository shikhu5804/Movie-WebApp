import React, { useEffect, useState } from "react";
import axios from "../Utiliss/axios";
import noimage from "/noimage.png";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Mousewheel, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

const Horicards = () => {
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("all");

  const getTrending = async (categoryType) => {
    try {
      const { data } = await axios.get(`/trending/${categoryType}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSelectChange = (value) => {
    setCategory(value);
  };

  useEffect(() => {
    getTrending(category);
  }, [category]);

  if (!trending.length) {
    return (
      <div className="text-white text-5xl font-bold flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Dropdown Filter */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white text-3xl font-black">Trending</h1>
        <Dropdown onSelectChange={handleSelectChange} title="Category">
          <option value="all">All</option>
          <option value="movie">Movies</option>
          <option value="tv">Series</option>
        </Dropdown>
      </div>

      <Swiper
        modules={[EffectCoverflow, Mousewheel, Autoplay]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: false,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
        }}
        className="max-w-[1400px]  mx-auto"
      >
        {trending.map((d, i) => (
          <SwiperSlide
            key={i}
            style={{ width: "320px", height: "450px" }}
            className="bg-[#6D28D9] rounded-2xl shadow-lg min-h-[60vh] overflow-hidden hover:shadow-xl transition-transform duration-300"
          >
            <Link to={`/${d.media_type}/details/${d.id}`}>
              <img
                src={
                  d.backdrop_path || d.poster_path
                    ? `https://image.tmdb.org/t/p/original/${
                        d.backdrop_path || d.poster_path
                      }`
                    : noimage
                }
                alt={d.name || d.title}
                className="w-full h-3/4 object-cover"
              />
              <div className="p-4">
                <h1 className="text-lg font-bold text-white truncate">
                  {d.name || d.title || d.original_name || d.original_title}
                </h1>
                <p className="text-sm text-zinc-100 mt-2 line-clamp-3">
                  {d.overview
                    ? d.overview.slice(0, 70) + "..."
                    : "No description available"}
                  <span className="text-blue-500 ml-1 underline"> more</span>
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Horicards;
