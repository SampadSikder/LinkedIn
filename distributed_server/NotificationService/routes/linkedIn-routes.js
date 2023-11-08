const express = require('express');
const router = express.Router();
const notifications = require("../controllers/notification-controller");

router.get("/notifications", notifications.getNotifications);
router.post("/notifications", notifications.postNotification);

module.exports = router;