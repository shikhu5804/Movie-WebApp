import React from "react";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black">
      <img
        className="h-[60vh] object-cover"
        src="/globe2.gif"
        alt="Loading"
      />
    </div>
  );
};

export default Loading;
