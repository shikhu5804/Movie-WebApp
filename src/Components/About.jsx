import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
    document.title="About Me"
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white px-5">
      <div className="max-w-4xl w-full bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 duration-500">
        <div className="p-10">
          <h2 className="text-4xl font-extrabold text-blue-400 mb-5">
            About Me
          </h2>
          <p className="text-lg mb-5">
            I'm a student at IIIT Ranchi who loves coding and video editing. I enjoy combining tech and creativity to build useful projects.
          </p>
          <p className="text-lg mb-2">
            Whether it’s creating a website or editing a video, I like to make things that have an impact.
          </p>
          <Link
            to="/contact"
            className="mt-5 inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-800 transition-all"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
