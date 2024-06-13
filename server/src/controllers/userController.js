const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
const getConnection = require("../../db/db");

exports.helloworld = async (req, res) => {
  res.status(200).send("Hello, World!");
};

exports.usercount = async (req, res) => {
  const connection = getConnection();

  const query = "CALL GetUserCount();";

  connection.query(query, (error, results) => {
    connection.end();
    if (error) return res.status(500).send(error);
    res.status(200).send(results);
  });
};

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);

  const connection = getConnection();
  const query = `INSERT INTO users (username, password, role_id) VALUES (?, ?, (SELECT id FROM roles WHERE name = 'user'))`;

  connection.query(query, [username, hashedPassword], (error, results) => {
    connection.end();
    if (error) return res.status(500).send(error);
    res.status(201).send({ message: "User created successfully" });
  });
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }

  const connection = getConnection();
  // Now selecting the role directly instead of role_id
  const query = `SELECT UserId, Email, Password, role FROM users WHERE Email = ?`;

  connection.query(query, [email], async (error, results) => {
    connection.end(); // Ensure you're managing database connections appropriately

    if (error) {
      console.log(error)
      return res.status(500).send({message: "An error occurred on the server."});
    }

    if (results.length === 0) {
      return res.status(404).send({message: "No user found."});
    }
    
    const user = results[0];
    const passwordIsValid = await bcrypt.compare(password, user.Password);

    if (!passwordIsValid) {
      return res.status(401).send({message: "Incorrect password."});
    }

    const secret = process.env.JWT_SECRET || 'default_secret_key'; // Use environment variable for JWT secret
    // Including role directly in the JWT payload
    const token = jwt.sign({ id: user.id, role: user.role }, secret, {
      expiresIn: 86400, // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token, role: user.role, id: user.UserId, name: user.Email });
  });
};

exports.register = async (req, res) => {
  const { email, password, role, securityQuestion, securityAnswer, zipCode } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const hashedSecurityAnswer = await bcrypt.hash(securityAnswer, 10);

  const connection = getConnection(); // Use getConnection to create a new DB connection

  connection.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
      if (error) {
          console.error('Database query error:', error); // Log the error
          connection.end(); // Close DB connection immediately after the query is done
          return res.status(500).json({ error: error.message }); // Send back a more generic error message to the client
      }
      if (results.length > 0) {
          connection.end(); // Close DB connection before sending response
          return res.status(409).json({ message: 'Email already in use' });
      } else {
          connection.query('INSERT INTO users SET ?', { email, password: hashedPassword,role: role, SecurityQuestion: securityQuestion, SecurityAnswer : hashedSecurityAnswer, ZipCode: zipCode }, (error, results) => {
              if (error) {
                  console.error('Database insert error:', error); // Log the error
                  connection.end(); // Close DB connection immediately after the query is done
                  return res.status(500).json({ error: error.message }); // Similarly, send back a more generic error message
              } else {
                  connection.end(); // Ensure connection is closed after operation
                  return res.status(201).json({ message: 'User registered' });
              }
          });
      }
  });
};




exports.resetPassword = async (req, res) => {
  const { email, securityQuestion, securityAnswer, newPassword } = req.body;
  
  const connection = getConnection(); // Establish a new database connection

  connection.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
      if (error) {
          connection.end(); // Close the database connection
          return res.status(500).json({ error: error.message }); // Send JSON error response
      }
      if (results.length == 0) {
          connection.end(); // Close the database connection
          return res.status(404).json({ message: 'User not found' }); // Send JSON error response
      } else {
          const user = results[0];
          const match = await bcrypt.compare(securityAnswer, user.security_answer);

          if (!match) {
              connection.end(); // Close the database connection
              return res.status(401).json({ message: 'Security answer is incorrect' }); // Send JSON error response
          } else {
              const hashedNewPassword = await bcrypt.hash(newPassword, 10);
              connection.query('UPDATE users SET password = ? WHERE email = ?', [hashedNewPassword, email], (error, updateResults) => {
                  connection.end(); // Close the database connection
                  if (error) {
                      return res.status(500).json({ error: error.message }); // Send JSON error response
                  } else {
                      return res.status(200).json({ message: 'Password updated successfully' }); // Send JSON success response
                  }
              });
          }
      }
  });
};

exports.testConnection = async (req, res) => {
  try {
      // Perform a simple operation to test the connection, for example, send a success message
      res.status(200).json({ message: 'Backend connection test successful' });
  } catch (error) {
      // Handle errors if any
      console.error('Error testing connection:', error);
      res.status(500).json({ error: 'Error testing connection' });
  }
};
exports.dbConnection = async (req, res) => {
  // Assuming 'db' is your established database connection from a separate configuration file.
  const connection = getConnection(); // Use your actual connection logic here.

  connection.query('SELECT 1', (error, results) => {
      connection.end(); // Make sure to close the connection after the query execution
      if (error) {
          // Log the error for debugging purposes and return a 500 status with a custom message
          console.error('Database connection test failed:', error);
          return res.status(500).json({ success: false, message: 'Database connection failed', error: error.message });
      }
      // If there's no error, return a 200 status indicating success
      return res.status(200).json({ success: true, message: 'Database connection successful' });
  });
};

exports.makePledge = async (req, res) => {
  const connection = getConnection();
  const pledgeData = req.body;
  const query = "SELECT * FROM pledges WHERE Category = ? AND UserId = ?";
  const values = [pledgeData.Category, pledgeData.UserId];

  connection.query(query, values, (error, results) => {
      if (error) {
          return res.status(500).send({ Result: error });
      }

      if (results.length > 0) {
          // If entry exists, update the quantity
          const currentQuantity = parseInt(results[0].Quantity);
          const requestedQuantity = parseInt(pledgeData.RequestQuantity);
          const newQuantity = currentQuantity + requestedQuantity;
          const updateQuery = "UPDATE pledges SET Quantity = ? WHERE Category = ? AND UserId = ?";
          const updateValues = [newQuantity, pledgeData.Category, pledgeData.UserId];

          connection.query(updateQuery, updateValues, (updateError, updateResults) => {
              if (updateError) {
                  return res.status(500).send({ Result: updateError });
              }
              res.status(200).send({ Result: "Quantity updated successfully" });
          });
      } else {
          // If entry does not exist, insert a new pledge
          const insertQuery = "INSERT INTO pledges (Category, Quantity, UserId) VALUES (?, ?, ?)";
          const insertValues = [pledgeData.Category, pledgeData.RequestQuantity, pledgeData.UserId];

          connection.query(insertQuery, insertValues, (insertError, insertResults) => {
              if (insertError) {
                  return res.status(500).send({ Result: insertError });
              }
              res.status(200).send({ Result: "Success" });
          });
      }
  });
};

exports.getPledges = async (req, res) => {
  const connection = getConnection();
  const userId = req.params.userId;
  const query = "Select * from pledges where UserId = "+userId+";";
  connection.query(query, (error, results) => {
    connection.end();
    if (error) return res.status(500).send(error);
    res.status(200).send(results);
  });
};