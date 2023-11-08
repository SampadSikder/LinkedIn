require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
//const { removeNotification } = require('./controllers/notification-job');
app.use(cors());
app.use(express.json());

// cron.schedule("0 */6 * * *", function () {
//     removeNotification();
// });

const routes = require('./routes/linkedIn-routes');
app.use("/", routes);


mongoose.connect("mongodb://notification_db:27017/notificationdb").then((result) => {
    app.listen(3012, () => {
        console.log("Server is running");
    })
})