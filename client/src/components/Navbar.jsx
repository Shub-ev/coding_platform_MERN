import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { RIT_LOGO } from '../assets';
import { useNavigate } from 'react-router-dom';
import { VscColorMode } from "react-icons/vsc";
import CreateTest from './CreateTest';

const Navbar = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [displayCreateTest, setDisplayCreateTest] = useState(false);
  const navigate = useNavigate();

  const options = [
    { title: "Practice", onClick: () => {} },
    { title: "Tests", onClick: () => {} },
    { title: "Create Test", onClick: () => { setDisplayCreateTest(!displayCreateTest); console.log(displayCreateTest); } },
    { title: "Profile", onClick: () => {} },
  ];

  const logoutHandler = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleClick = () => {
    setDisplayMenu(!displayMenu);
    console.log("click" + displayMenu);
  };

  return (
    <div className='Navbar flex relative items-center justify-between px-[3%] xs:pt-[4%] xs:pb-[6%] lg:pt-[1%] lg:pb-[2%]'>
      <img src={RIT_LOGO} alt="rit_logo" className='h-[34px] lg:h-[48px]' onClick={() => {navigate('/')}} />
      <div className='flex items-center xs:gap-4 md:gap-6 lg:gap-8'>
        <GiHamburgerMenu className='text-[30px] lg:hidden' onClick={handleClick} />
        <ul className={`mbView xs:absolute z-[999] xs:right-[3%] xs:top-12 bg-white xs:border-[1px] xs:px-[16px] lg:px-0 xs:py-[14px] flex xs:flex-col xs:gap-2 xs:border-slate-500 ${displayMenu ? "" : "xs:hidden"} md:flex md:flex-col lg:flex lg:flex-row justify-center lg:items-center lg:border-none lg:gap-14 lg:top-0 cursor-pointer`}>
          <VscColorMode size={22} className='flex items-center justify-center flex-row' />
          {options.map((data, index) => (
            <li className='lg:font-medium' onClick={data.onClick} key={index}>{data.title}</li>
          ))}
          <button className='bg-blue-950 text-white xs:px-[14px] xs:py-[4px] xs:text-sm xs:mt-2 lg:px-[34px] lg:text-md lg:py-[12px] lg:mt-0 lg:border-2 lg:ml-10 lg:hover:bg-white lg:hover:text-black lg:hover:border-blue-950 transition duration-500 ease-in-out' onClick={logoutHandler}>
            Logout
          </button>
        </ul>
      </div>
      { displayCreateTest && <CreateTest setDisplayCreateTest={setDisplayCreateTest} /> }
    </div>
  );
};

export default Navbar;
