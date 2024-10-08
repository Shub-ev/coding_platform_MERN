import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import { RIT_LOGO } from '../assets';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const navigate = useNavigate();

  const options = [
    { title: "Profile" },
    { title: "Practice" },
    { title: "Test" },
  ]

  const logoutHandler = () => {
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <div className='Navbar flex relative items-center justify-between px-[3%] py-[1%]'>
      <img src={RIT_LOGO} alt="rit_logo" className='h-[34px]' />
      <GiHamburgerMenu className='text-[30px]' onClick={() => setDisplayMenu(!displayMenu)}/>

      { displayMenu && 
        <ul className='mbView absolute right-[3%] top-12 bg-white border-[1px] px-[16px] py-[14px] flex flex-col gap-2 tracking-widest border-slate-500'>
          {options.map((data, index) => (
            <li key={index}>{data.title}</li>
          ))}
          <button className='bg-blue-950 text-white px-[14px] py-[4px] text-sm mt-2' onClick={logoutHandler}>Logout</button>
        </ul>
      }
    </div>
  )
}

export default Navbar