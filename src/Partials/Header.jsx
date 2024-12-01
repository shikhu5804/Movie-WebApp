import React, { useEffect, useState } from "react";
import axios from "../Utiliss/axios";
import { Link } from "react-router-dom";

const Header = () => {
  const [wallpaper, setWallpaper] = useState(null);

  const getWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let random = data.results[(Math.random() * data.results.length).toFixed()];
      setWallpaper(random);
      console.log(wallpaper);
      // setInterval(() => {
      //   let random =data.results[(Math.random() * data.results.length).toFixed()];
      //   setWallpaper(random);
      //   console.log(wallpaper);
      // }, 5000);
    } catch (error) {
      console.log("Error:", error);
    }
  };


 useEffect(() => {
    getWallpaper();
  }, []);

  if (!wallpaper) {
    return <h1>Loading...</h1>; 
  }

  return (
    <>
    <div
      className="h-[70vh] relative w-screen bg-red-400 flex flex-col items-start justify-end p-[7%]"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, .2), rgba(0, 0, 0, .5), rgba(0, 0, 0, .8)), url(https://image.tmdb.org/t/p/original/${
          wallpaper.backdrop_path || wallpaper.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        
      }}

    ><h1 className="text-5xl font-black text-white  ">
         {wallpaper.name || wallpaper.title || wallpaper.original_name || wallpaper.original_title}
         </h1>
         <p className="text-white w-[60%] mt-5 ">{wallpaper.overview.slice(0, 200)}<Link to={`/${wallpaper.media_type}/details/${wallpaper.id}`} className="text-blue-200">...more</Link></p>
         <p className="text-white mt-2 text-[2.2vh]">
         <i class="text-yellow-500  ri-megaphone-fill"></i>{" "}{wallpaper.release_date ? wallpaper.release_date : "NA"}
         <i class="text-yellow-500 ml-5 ri-album-fill"></i>{" "}{wallpaper.media_type.toUpperCase()}
         </p>
         <Link className="hover:text-white  text-zinc-200 font-semibold p-4 mt-2 rounded-xl bg-[#6556CD]"> <i className="ri-play-fill mr-2"></i>
         Watch Trailer
         </Link>
    </div>
    </>
  )

};

export default Header;
