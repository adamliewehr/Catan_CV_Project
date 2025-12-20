import { useState, useEffect } from "react";
import * as d3 from "d3";

import Histogram2 from "./d3Plots/testPlot2.jsx";
import WebcamCapture from "./cameraTest.jsx";

function HandDetection() {
  return (
    <>
      <WebcamCapture apiString={"/api/getHandImage"}></WebcamCapture>
    </>
  );
}

export default HandDetection;
