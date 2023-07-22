const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    notification: {
        type: String,
        required: true,
        unique: true
    }
})

const Notifications = mongoose.model('Notifications', NotificationSchema);

module.exports = { Notifications }