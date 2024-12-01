import React from 'react';
import Sidenav from '../Partials/Sidenav';
import Topbar from '../Partials/Topbar';
import Header from '../Partials/Header';
import Horicards from '../Partials/Horicards';

const Home = () => {
  
    document.title = "Home";
    return (
      <div className='flex overflow-hidden'>
        <Sidenav />
        <div className='w-[80%] h-full ml-[20%] pl-3 overflow-x-hidden '>
            <Topbar  />
          <Header />
          <Horicards/>
        </div>
      </div>
    );
};

export default Home;
