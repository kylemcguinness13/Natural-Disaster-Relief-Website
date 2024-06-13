const getConnection = require("../../db/db");

exports.getNotifications = async (req, res) => {
  const connection = getConnection();

  const userId = req.params.userId;
  const query = "CALL fetch_all_notifications_for_user(" + userId + ");";

  connection.query(query, (error, results) => {
    connection.end();
    if (error) return res.status(500).send(error);
    res.status(200).send(results[0]);
  });
};

exports.notifyUser = async (req, res) => {
  const connection = getConnection();
  const { UserId, NotificationMessage } = req.body;
  const query =
    "CALL notify_user(" + UserId + ", '" + NotificationMessage + "');";
  connection.query(query, (error, results) => {
    connection.end();
    if (error) return res.status(500).send(error);
    res.status(200).send({ message: "Notification sent successfully" });
  });
};

exports.readNotification = async (req, res) => {
  const connection = getConnection();
  const { notificationId } = req.body;

  const query =
    "update Notifications set NotificationRead = true where notification_id = " +
    notificationId +
    ";";
  connection.query(query, (error, results) => {
    connection.end();
    if (error) return res.status(500).send(error);
    res.status(200).send({ message: "Notification read successfully" });
  });
};
