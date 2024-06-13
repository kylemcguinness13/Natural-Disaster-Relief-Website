const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");
const getConnection = require("../../db/db");


router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/helloworld", userController.helloworld);
router.get("/usercount", userController.usercount);
router.get('/testConnection', userController.testConnection);
router.get('/test-db', userController.dbConnection)
router.post('/reset-password', userController.resetPassword)
router.post('/makepledge', userController.makePledge)
router.get("/getpledges/:userId", userController.getPledges)
// Example of a protected route
router.get("/admin", [verifyToken, isAdmin], (req, res) => {
  res.status(200).send("Admin content");
});




module.exports = router;
