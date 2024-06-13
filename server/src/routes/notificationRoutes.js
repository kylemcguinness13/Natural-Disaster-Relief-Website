const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

router.get('/getnotifications/:userId', notificationController.getNotifications);
router.post('/notifyuser', notificationController.notifyUser);
router.post('/readnotification', notificationController.readNotification);

module.exports = router;