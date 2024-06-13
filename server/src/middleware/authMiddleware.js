const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const dbConfig = require('../../db/db');

function getConnection() {
    return mysql.createConnection(dbConfig);
}

exports.verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        req.userId = decoded.id;
        next();
    });
};

exports.isAdmin = (req, res, next) => {
    const connection = getConnection();
    const query = `SELECT r.name AS role FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = ?`;

    connection.query(query, [req.userId], (error, results) => {
        connection.end();
        if (error) return res.status(500).send({ message: "Failed to verify user's role." });
        if (results[0].role !== 'admin') return res.status(403).send({ message: 'Require Admin Role!' });
        next();
    });
};
