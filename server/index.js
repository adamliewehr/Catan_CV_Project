import 'dotenv/config'; // Loads the .env file

import express from 'express';
import mongoose from 'mongoose'; // mongoDB connection
import cors from 'cors';

// mongo schemas
import Test from './models/Test.js';

const app = express();
app.use(express.json())
app.use(cors()); // Allows requests from your client's origin
const PORT = 3000;

// connection to MongoDB with then catch
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to mongoDB");

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });

}).catch((error) => {
    console.error('mongoDB connection error:', error);
    // Stop the Node.js process if the connection fails
    process.exit(1);
});

app.post("/api/storeInfo", async (req, res) => {
    const { name, message } = req.body;

    const newTest = await Test.create({
        name,
        message
    });

});


app.get("/api/getInfo", async (req, res) => {

    const allNames = await Test.find();

    res.send(allNames);

});


