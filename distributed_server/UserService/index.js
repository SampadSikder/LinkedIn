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


mongoose.connect("mongodb://mongo:27017/userdb", { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
    app.listen(3010, () => {
        console.log("Server is running");
    })
})