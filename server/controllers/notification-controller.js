const { Notifications } = require("../models/Notifications");

async function getNotifications(req, res) {
    const userId = req.user.id;

    removeNotification();
    const notifications = await Notifications.find({
        'users._id': userId
    }).limit(5).sort({ timestamp: -1 });
    res.json(notifications);
}

async function postNotification(notification, users) {
    const userIds = users.map(user => ({ _id: user._id }));
    console.log(userIds);
    await Notifications.create({
        notification: notification,
        users: userIds
    })
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