import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth.context.jsx';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const navigate = useNavigate();

  const { signup } = useContext(AuthContext);

  const handleSignup = async (event) => {
    event.preventDefault();

    if (pass1 !== pass2) {
      console.warn('Passwords did not match');
      return;
    }

    const user = {
      email: email,
      password: pass1,
    };

    const res = await signup(user);
    if (res.success) {
      navigate('/');
    }
    console.log(res);
  }

  return (
    <div className='LoginPage fixed w-full h-screen flex items-center justify-center bg-gradient-to-r from-slate-50 to-slate-400'>
      <div className='bg-white p-10 rounded-lg shadow-xl w-[350px]'>
        <h2 className='text-4xl font-semibold mb-8 text-center text-indigo-700 tracking-widest'>SIGN UP</h2>
        <form className='space-y-4 mt-4'>
          <div className='flex flex-col'>
            <label htmlFor='email' className='text-sm font-semibold text-gray-700 mb-2'>
              Email Address
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              className='px-4 py-2 border text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'
              required
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password' className='text-sm font-semibold text-gray-700 mb-2'>
              Password
            </label>
            <input
              type='password'
              id='password1'
              value={pass1}
              onChange={(e) => setPass1(e.target.value)}
              placeholder='Enter your password'
              className='px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400'
              required
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password' className='text-sm font-semibold text-gray-700 mb-2'>
              Confirm Password
            </label>
            <input
              type='password'
              id='password2'
              value={pass2}
              onChange={(e) => setPass2(e.target.value)}
              placeholder='Enter your password'
              className='px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400'
              required
            />
          </div>
          <button
            type='submit'
            onClick={handleSignup}
            className='w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-500 transition-colors'>
            Sign Up
          </button>
          <p className='text-center text-sm text-gray-600 mt-4'>
            Already have an account?{' '}
            <Link to={'/login'} href='#' className='text-indigo-500 hover:underline'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
