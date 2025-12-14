import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import './App.css'
import TestPage from './testPage';
import Home from './Home';

function App() {

  


  return (
    <>

      <BrowserRouter>
        <nav>
          <div className='flex-container'>

            <NavLink to="/" className="navLink">Home</NavLink>
            <NavLink to="/testPage" className="navLink">Test Page</NavLink>
            

          </div>

        </nav>


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testPage" element={<TestPage />} />
          
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
