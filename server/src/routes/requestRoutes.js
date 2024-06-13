const express = require("express");
const router = express.Router();
const requestsController = require("../controllers/requestsController");

router.get('/getcategories', requestsController.getCategories);
router.post('/createrequest', requestsController.createRequest);
router.get('/getrequests', requestsController.getRequests);
router.post('/updaterequest', requestsController.updateRequest);
router.get('/getfulfilledrequests/:userId', requestsController.getFulfilledRequests);
router.get('/getrecipientresponses/:userId', requestsController.getRecipientResponses);
router.get('/getactiverequests/:userId', requestsController.getActiveRequests);


module.exports = router;