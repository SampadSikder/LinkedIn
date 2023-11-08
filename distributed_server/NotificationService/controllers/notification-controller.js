const { Notifications } = require("../models/Notifications");

async function getNotifications(req, res) {
    removeNotification();
    const notifications = await Notifications.find().limit(5).sort({ timestamp: -1 });
    res.json(notifications);
}

async function postNotification(req, res) {
    const notification = req.body.notification;
    await Notifications.create({
        notification: notification
    })
    res.status(200).json(notification);
}

async function removeNotification() {
    const sixHoursAgo = new Date();
    sixHoursAgo.setHours(sixHoursAgo.getHours() - 6);
    await Notifications.deleteMany({ createdAt: { $lt: sixHoursAgo } });
}

module.exports = {
    getNotifications,
    postNotification
}