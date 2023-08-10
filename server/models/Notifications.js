const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({

    notification: {
        type: String,
        required: true,
        unique: false,
    },
    users: [
        {
            _id: {
                type: mongoose.Types.ObjectId,
                required: true
            }
        }
    ]
})

const Notifications = mongoose.model('Notifications', NotificationSchema);

module.exports = { Notifications }