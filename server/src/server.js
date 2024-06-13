const express = require("express");
const app = express();
const cors = require('cors'); // we need to import cors middlewhere, because fornt end is runng on a different port
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const requestRoutes = require("./routes/requestRoutes")
const notificationRoutes = require("./routes/notificationRoutes");

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Define routes
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/requests", requestRoutes)
app.use("/api/notifications", notificationRoutes);

module.exports = app;
