import React, { useState } from "react";
import Sidenav from "../Partials/Sidenav";
import Topbar from "../Partials/Topbar";
import Header from "../Partials/Header";
import Horicards from "../Partials/Horicards";

const Home = () => {
  const [loading, setLoading] = useState(true);

  document.title = "Home";

  return (
    <div className="w-[100%]">
    {/* <div className="flex w-[20%] relative z-20 overflow-hidden">
      <Sidenav />
       </div> */}
      <div className="w-full absolute  bg-zinc-900 h-full overflow-x-hidden">
      {!loading && <Topbar isHome={true} />}
      <Header setLoading={setLoading} />
        <Horicards />
      </div>
      </div>
  );
};

export default Home;
