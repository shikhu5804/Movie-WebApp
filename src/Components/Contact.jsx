import React from "react";
import profilePhoto from "/profilephoto.jpg";
import car from "/car.jpg";

const Contact = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Blurred background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${car})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "blur(8px)", // Apply blur to the background
        }}
      ></div>

      {/* Dark overlay on top of the background */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Centered contact card */}
      <div className="relative flex flex-row items-center bg-white bg-opacity-90 rounded-xl shadow-lg p-8 w-[80vh]  z-10">
        <img
          src={profilePhoto}
          alt="Shikhar Verma"
          className="w-24 h-24 rounded-full shadow-md mr-6"
        />
        <div>
          <h2 className="text-2xl font-semibold">Shikhar Verma</h2>
          <p className="text-gray-500 italic mb-2">Coder and Editor</p>
          <p className="text-gray-700">Email: shikharvrm123@gmail.com</p>
          <p className="text-gray-700">Phone: +91 86xxxxxxx5</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
