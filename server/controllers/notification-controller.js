const { Notifications } = require("../models/Notifications");

async function getNotifications(req, res) {
    const notifications = await Notifications.aggregate([
        { $sort: { timestamp: -1 } },
        { $limit: 5 }
    ]);
    console.log(notifications);
    res.json(notifications);
}

module.exports = {
    getNotifications
}