import React, { useContext, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import AuthContext from '../context/auth.context'
import Navbar from '../components/Navbar';

const RootLayout = () => {
  const user = localStorage.getItem('user');

  return (
    <div>
      <Navbar/>
      {user ? <Outlet /> : <Navigate to="/login" />}
    </div>
  )
}

export default RootLayout