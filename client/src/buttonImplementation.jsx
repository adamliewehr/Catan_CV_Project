import { useState, useEffect } from "react";
import * as d3 from "d3";

import Histogram2 from "./d3Plots/testPlot2.jsx";
import WebcamCapture from "./cameraTest.jsx";

function MainPage1() {
  const [data, setData] = useState([]);

  function addData(num) {
    setData([...data, num]);
  }

  const possibleRolls = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <>
      <div className='flex-container'>
        {possibleRolls.map((num, index) => {
          return (
            <button onClick={() => addData(num)} key={index}>
              {num}
            </button>
          );
        })}
      </div>

      <br />

      <Histogram2 width={500} height={500} data={data}></Histogram2>
      <WebcamCapture apiString={"/api/getDiceImage"}></WebcamCapture>
    </>
  );
}

export default MainPage1;
