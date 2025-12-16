import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import TestPage from "./testPage";
import Home from "./Home";
import MainPage1 from "./buttonImplementation";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <div className='flex-container'>
            <NavLink to='/' className='navLink'>
              Home
            </NavLink>
            <NavLink to='/testPage' className='navLink'>
              Test Page
            </NavLink>
            <NavLink to='/mainPage1' className='navLink'>
              mainPage1
            </NavLink>
          </div>
        </nav>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/testPage' element={<TestPage />} />
          <Route path='/mainPage1' element={<MainPage1 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
