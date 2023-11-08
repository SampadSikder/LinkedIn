const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({

    notification: {
        type: String,
        required: true,
        unique: false,
    }
})

const Notifications = mongoose.model('Notifications', NotificationSchema);

module.exports = { Notifications }