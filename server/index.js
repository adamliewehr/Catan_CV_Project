import "dotenv/config"; // Loads the .env file
import http from "http";

import express from "express";
import mongoose from "mongoose"; // mongoDB connection
import cors from "cors";

// mongo schemas
import Test from "./models/Test.js";
import DiceRollImage from "./models/DiceRollImage.js";

const app = express();
app.use(express.json({ limit: "10mb" })); // so that we can get the base64 string from the client side
app.use(cors()); // Allows requests from your client's origin
const PORT = 3000;

// connection to MongoDB with then catch
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to mongoDB");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("mongoDB connection error:", error);
    // Stop the Node.js process if the connection fails
    process.exit(1);
  });

app.post("/api/storeInfo", async (req, res) => {
  const { name, message } = req.body;

  const newTest = await Test.create({
    name,
    message,
  });
});

app.get("/api/getInfo", async (req, res) => {
  const allNames = await Test.find();

  res.send(allNames);
});

app.post("/api/getDiceImage", async (req, res) => {
  const { base64 } = req.body;

  //   console.log(base64);
  //   const newDiceRollImage = await DiceRollImage.create({
  //     base64,
  //   });

  //instead of logging this to MongoDB, we will store the result in
  // mongoDB once the data is sent back from the CV model
  // we will simply just hand it off to the python microservice at this point

  const payload = JSON.stringify({ image: base64 });

  const options = {
    hostname: "127.0.0.1", // The address of your Python server
    port: 8000, // The port FastAPI is listening on
    path: "/process-dice", // The specific api route we created in Python
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(payload), // Telling Python how big the "package" is
    },
  };

  // In Node, http.request doesn't just grab a file and hand it to you.
  // Instead, it opens a "pipe" between your Express server and the Python server.
  // Because network data can be large, it doesn't arrive all at once in one big box.

  // I'm assuming this is just how python API's are done...

  const pyReq = http.request(options, (pyRes) => {
    // initiates the connection
    let data = "";

    pyRes.on("data", (chunk) => {
      data += chunk; // As bits of data arrive from Python, we stack them up
    });

    pyRes.on("end", () => {
      const result = JSON.parse(data); // Python is done talking; let's read the final message
      console.log("Result from Python:", result);
      res.send(result); // Finally send the answer back to your React frontend
    });
  });

  // If Python is turned off or crashes, this catches the error
  pyReq.on("error", (error) => {
    console.error("FastAPI Error:", error);
    res.status(500).send("Python service is down");
  });

  // This is the go button that actually sends the data
  pyReq.write(payload);
  pyReq.end();
});

app.post("/api/getHandImage", async (req, res) => {
  const { base64 } = req.body;

  //   console.log(base64);
  //   const newDiceRollImage = await DiceRollImage.create({
  //     base64,
  //   });

  //instead of logging this to MongoDB, we will store the result in
  // mongoDB once the data is sent back from the CV model
  // we will simply just hand it off to the python microservice at this point

  const payload = JSON.stringify({ image: base64 });

  const options = {
    hostname: "127.0.0.1", // The address of your Python server
    port: 8000, // The port FastAPI is listening on
    path: "/process-hand", // The specific api route we created in Python
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(payload), // Telling Python how big the "package" is
    },
  };

  // In Node, http.request doesn't just grab a file and hand it to you.
  // Instead, it opens a "pipe" between your Express server and the Python server.
  // Because network data can be large, it doesn't arrive all at once in one big box.

  // I'm assuming this is just how python API's are done...

  const pyReq = http.request(options, (pyRes) => {
    // initiates the connection
    let data = "";

    pyRes.on("data", (chunk) => {
      data += chunk; // As bits of data arrive from Python, we stack them up
    });

    pyRes.on("end", () => {
      const result = JSON.parse(data); // Python is done talking; let's read the final message
      console.log("Result from Python:", result);
      res.send(result); // Finally send the answer back to your React frontend
    });
  });

  // If Python is turned off or crashes, this catches the error
  pyReq.on("error", (error) => {
    console.error("FastAPI Error:", error);
    res.status(500).send("Python service is down");
  });

  // This is the go button that actually sends the data
  pyReq.write(payload);
  pyReq.end();
});
