const { Notifications } = require("../models/Notifications");


async function removeNotification() {
    console.log("Removing notification");
    await Notifications.deleteMany({});
}


module.exports = {
    removeNotification
}