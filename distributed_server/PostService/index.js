require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
app.use(cors());
app.use(express.json());

const routes = require('./routes/linkedIn-routes');
app.use("/", routes);


mongoose.connect("mongodb://post_db:27017/postdb").then((result) => {
    app.listen(3011, () => {
        console.log("Server is running");
    })
})