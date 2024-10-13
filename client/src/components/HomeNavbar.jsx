import React from 'react'
import { IoSearch } from 'react-icons/io5';

const HomeNavbar = () => {
    return (
        <div className='border-2 h-[44px] flex flex-row items-center rounded-full w-full md:max-w-[300px] lg:max-w-[350px] border-grey'>
            <input type="text" name="search" id="search" className='px-4 py-1 w-full rounded-full text-grey-700 outline-none flex items-center'
                placeholder='Search test here'
            />
            <button type="button" className='pr-3'>
                <IoSearch size={22} className='text-gray-800' />
            </button>
        </div>
    )
}

export default HomeNavbar