import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Login, Signup } from './pages'
import RootLayout from './root_layout/RootLayout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App