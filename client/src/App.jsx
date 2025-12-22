import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import TestPage from "./testPage";
import Home from "./Home";
import MainPage1 from "./buttonImplementation";
import HandDetection from "./handDetectionTest";
import DigitalDice from "./rollDigitalDice";

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
            <NavLink to='/handTest' className='navLink'>
              handTest
            </NavLink>
            <NavLink to='/digitalDice' className='navLink'>
              Digital Dice
            </NavLink>
          </div>
        </nav>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/testPage' element={<TestPage />} />
          <Route path='/mainPage1' element={<MainPage1 />} />
          <Route path='/handTest' element={<HandDetection />} />
          <Route path='/digitalDice' element={<DigitalDice />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
