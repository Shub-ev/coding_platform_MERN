import React from 'react'
import { IoSearch } from 'react-icons/io5'

const Home = () => {
    return (
        <div className='HomePage'>
            {/* Adjusted width and removed margin-top */}
            <div className='border-2 h-full flex flex-row items-center rounded-full xs:mx-4 md:mr-44 lg:mr-44 w-full md:max-w-[300px] lg:max-w-[300px] border-grey'>
                <input type="text" name="search" id="search" className='px-4 py-1 w-full rounded-full text-grey-700 outline-none flex items-center'
                    placeholder='Search test here'
                />
                <button type="button" className='px-2'>
                    <IoSearch size={18} className='text-gray-800' />
                </button>
            </div>
        </div>
    )
}

export default Home