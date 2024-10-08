import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth.context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const res = await login({ email, password });
    if (res.success) {
      navigate('/');
    }
  }

  return (
    <div className='LoginPage fixed w-full h-screen flex items-center justify-center bg-gradient-to-r from-slate-50 to-slate-400'>
      <div className='bg-white p-10 rounded-lg shadow-xl w-[350px]'>
        <h2 className='text-4xl font-semibold mb-8 text-center text-indigo-700 tracking-widest'>LOGIN</h2>
        <form className='space-y-4 mt-4' onSubmit={handleLogin}>
          <div className='flex flex-col'>
            <label htmlFor='email' className='font-semibold text-sm text-gray-700 mb-2'>
              Email Address
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              className='px-4 py-2 text-black-700 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400'
              required
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password' className='text-sm font-semibold text-gray-700 mb-2'>
              Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'
              required
            />
            <p className='text-right text-sm text-gray-600 mt-2'>
              Forgot {' '}
              <a href='#' className='text-indigo-500 hover:underline'>
                Password?
              </a>
            </p>
          </div>
          <button
            type='submit'
            className='w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-500 transition-colors'>
            Log In
          </button>
          <p className='text-center text-sm text-gray-600 mt-4'>
            Don't have an account?{' '}
            <Link to={'/signup'} href='#' className='text-indigo-500 hover:underline'>
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
