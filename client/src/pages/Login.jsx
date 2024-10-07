import React from 'react';

const Login = () => {
  return (
    <div className='LoginPage w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600'>
      <div className='bg-white p-10 rounded-lg shadow-lg w-[400px]'>
        <h2 className='text-4xl font-bold mb-6 text-center text-indigo-700'>Login</h2>
        <form className='space-y-6'>
          <div className='flex flex-col'>
            <label htmlFor='email' className='text-lg font-semibold text-gray-700 mb-2'>
              Email Address
            </label>
            <input
              type='email'
              id='email'
              placeholder='Enter your email'
              className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password' className='text-lg font-semibold text-gray-700 mb-2'>
              Password
            </label>
            <input
              type='password'
              id='password'
              placeholder='Enter your password'
              className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500 transition-colors'>
            Log In
          </button>
          <p className='text-center text-gray-600 mt-4'>
            Don't have an account?{' '}
            <a href='#' className='text-indigo-500 hover:underline'>
              Sign up here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
