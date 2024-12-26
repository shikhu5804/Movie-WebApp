import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Trending from "./Components/Trending";
import Popular from "./Components/Popular";
import Movie from "./Components/Movie";
import People from "./Components/People";
import Tv from "./Components/Tv";
import Contact from "./Components/Contact";
import About from "./Components/About";
import PersonDetails from "./Components/PersonDetails";
import TvDetails from "./Components/TvDetails";
import MovieDetails from "./Components/MovieDetails";
import Trailer from "./Partials/Trailer";
import Stream from "./Partials/Stream";

const App = () => {
  return (
    <div className="bg-[#1F1E24] w-full h-full ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/stream" element={<Stream />} />
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="/tv/details/:id/stream" element={<Stream />} />

          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/people" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about_me" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
