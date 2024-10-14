import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Login, Signup, TestPage } from './pages'
import RootLayout from './root_layout/RootLayout';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <Router>
      <Toaster/>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path='/testPage' element={<TestPage/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App