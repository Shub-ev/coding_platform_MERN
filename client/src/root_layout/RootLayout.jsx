import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import AuthContext from '../context/auth.context'

const RootLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user ? <Outlet /> : <Navigate to="/login" />}
    </div>
  )
}

export default RootLayout