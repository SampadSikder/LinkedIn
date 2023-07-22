require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());
app.use(express.json());

const routes = require('./routes/linkedIn-routes');
app.use("/", routes);


mongoose.connect("mongodb://localhost:27017/LinkedIn?retryWrites=true&w=majority").then((result) => {
    app.listen(8080, () => {
        console.log("Server is running");
    })
})