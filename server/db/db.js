require("dotenv").config();
const mysql = require("mysql2");

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

function getConnection() {
  // const connection = mysql.createConnection(process.env.DATABASE_URL);
const connection = mysql.createConnection(dbConfig);
  connection.connect((err) => {
    if (err) {
      console.log("Error connecting to database:", err);
    } else {
      //connected
    }
  });
  return connection;
}

module.exports = getConnection;
