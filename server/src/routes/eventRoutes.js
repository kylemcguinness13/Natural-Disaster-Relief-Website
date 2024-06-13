const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");

router.get('/getevents', eventsController.getEvents);
router.post('/updateevent', eventsController.updateEvent);
router.post('/createevent', eventsController.createEvent);

module.exports = router;