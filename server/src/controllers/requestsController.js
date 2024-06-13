const getConnection = require("../../db/db");

exports.getCategories = async (req, res) => {
  const connection = getConnection();

  const query = "CALL fetch_all_categories();";

  connection.query(query, (error, results) => {
    connection.end();
    if (error) return res.status(500).send(error);
    res.status(200).send(results[0]);
  });
};

exports.createRequest = async (req, res) => {
  const connection = getConnection();
  
  const requestData = req.body; 

  let quant = parseInt(requestData.RequestQuantity);

  const userZipCodeQuery = "SELECT users.ZipCode FROM users WHERE users.UserId = "+requestData.UserId+";";
  let userZip = 0;
  connection.query(userZipCodeQuery, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ Result: error });
    }
    userZip = parseInt(results[0].ZipCode);
  });
  let pledge = true;
  let pledgeMatches = [];
  let pledgeUpdate = null; 
  const cat = requestData.Category;
  const checkQuery = "CALL GetPledgesByCategory('"+cat+"');";

  connection.query(checkQuery, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ Result: error });
    }
    results = results[0];
    if (results.length == 0)
    {
      pledge = false;
    }
    else if (results.length == 1){
      let onlyQuant = parseInt(results[0].Quantity);
      if (quant < onlyQuant){
        let newQuant = (onlyQuant-quant).toString();
        results[0].Quantity = newQuant;
        pledgeUpdate = results[0];
        pledgeUpdate["ResponseQuant"] = quant.toString();
        quant = 0;
      }
      else {
        quant -= onlyQuant;
        pledgeMatches.push(results[0]);
      }
    }
    else{
      //order by the UserZipCode then keep subtracting the quantities from the requested quantity unit the number is fulfilled or pledges run out
      //update the final one if there is a mismatch by sending info to an update pledge method
      while (results.length != pledgeMatches.length && quant != 0){
        let bestMatch = results[0];
        let closestNum = Math.abs(parseInt(results[0].UserZipCode)-userZip);
        for (let i = 1; i < results.length; i++){
          let dist = Math.abs(parseInt(results[i].UserZipCode)-userZip);
          if (dist < closestNum && !pledgeMatches.includes(results[i])){
            closestNum = dist;
            bestMatch = results[i];
          }
        }
        let bestMatchQuant = parseInt(bestMatch.Quantity);
        if(bestMatchQuant > quant){
          bestMatch.Quantity = (bestMatchQuant - quant).toString();
          pledgeUpdate = bestMatch;
          pledgeUpdate["ResponseQuant"] = quant.toString();
          quant = 0;
        }
        else {
          quant -= bestMatchQuant;
          pledgeMatches.push(bestMatch);
        }
      }
    }
  });
  where = 3;
  const query6 = "INSERT INTO requests (EventId, Category, RequestQuantity, RequestUrgency, RequestStatus, UserId) VALUES (?, ?, ?, ?, ?, ?);";
  const values6 = [requestData.EventId, requestData.Category, requestData.RequestQuantity, requestData.RequestUrgency, requestData.RequestStatus, requestData.UserId];

  connection.query(query6, values6, (error, results) => {
      if (error) {
        console.log(error);
          return res.status(500).send({Result: error});
      }
      reqId = results.insertId.toString();

      if (pledgeUpdate != null){
        const updateQuery = "UPDATE pledges SET Quantity = "+pledgeUpdate.Quantity+" WHERE PledgeId = "+pledgeUpdate.PledgeId+";";
        connection.query(updateQuery, (error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).send({ Result: error });
          }
        });

        const query1 = "INSERT INTO responses (RequestId, UserId, Quantity) VALUES (?,?,?);";
        const values1 = [reqId, pledgeUpdate.UserId, pledgeUpdate.ResponseQuant];
    
        connection.query(query1, values1, (error1, results1) => {
          if (error) {
            console.log(error);
            return res.status(500).send({ Result: error });
          }
    
        });
      }
      for (let i = 0; i <pledgeMatches.length; i++){
        const query1 = "INSERT INTO responses (RequestId, UserId, Quantity) VALUES (?,?,?);";
        const values1 = [reqId, pledgeMatches[i].UserId, pledgeMatches[i].Quantity];
        connection.query(query1, values1, (error1, results1) => {
          if (error) {
            console.log(error);
            return res.status(500).send({ Result: error });
          }
    
        });
        const query2 = "DELETE FROM pledges Where PledgeId = " + pledgeMatches[i].PledgeId + ";";
        connection.query(query2, (error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).send({ Result: error });
          }
        });
      }
      where = 5;
      if(pledge){
        let query2 = "UPDATE requests SET RequestQuantity = '" + quant.toString() + "'";
        if (quant == 0) {
          query2 += ", RequestStatus = '0'";
        }
        query2 += " WHERE RequestId = '" + reqId.toString() + "'";
        connection.query(query2, (error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).send({ Result: error });
          }
        });
      }
      res.status(200).send({ Result: "Success" });
  });
};

exports.getRequests = async (req, res) => {
  const connection = getConnection();

  const query = "CALL fetch_all_unfulfilled_requests();";

  connection.query(query, (error, results) => {
    connection.end();
    if (error) return res.status(500).send(error);
    res.status(200).send(results[0]);
  });
};

exports.getFulfilledRequests = async (req, res) => {
  const connection = getConnection();
  const userId = req.params.userId;
  const query = "CALL fetch_all_responses_by_userid("+ userId +");";
  connection.query(query, (error, results) => {
    connection.end();
    if (error) return res.status(500).send(error);
    res.status(200).send(results[0]);
  });
};

exports.getRecipientResponses = async (req, res) => {
  const connection = getConnection();
  const userId = req.params.userId;
  const query = "CALL fetch_all_donations_by_userid("+ userId +");";
  connection.query(query, (error, results) => {
    connection.end();
    if (error) return res.status(500).send(error);
    res.status(200).send(results[0]);
  });
};

exports.getActiveRequests = async (req, res) => {
  const connection = getConnection();
  const userId = req.params.userId;
  const query = "CALL fetch_all_active_requests_by_userid("+ userId +");";
  connection.query(query, (error, results) => {
    connection.end();
    if (error) return res.status(500).send(error);
    res.status(200).send(results[0]);
  });
};


exports.updateRequest = async (req, res) => {
  const connection = getConnection();
  
  const quantityData = req.body; 
  const requestQuantity = parseInt(quantityData.RequestQuantity);
  const amount = parseInt(quantityData.Amount);
  const newQuantity = requestQuantity-amount;

  const query1 = "INSERT INTO responses (RequestID, UserId, Quantity) VALUES (?, ?, ?)";
  const values1 = [quantityData.RequestId, quantityData.UserId, quantityData.Amount];

  let query2 = "UPDATE requests SET RequestQuantity = '" + newQuantity.toString() + "'";
  if (newQuantity == 0) {
    query2 += ", RequestStatus = '0'";
  }
  query2 += " WHERE RequestId = '" + quantityData.RequestId + "'";

  connection.query(query1, values1, (error1, results1) => {
    if (error1) {
        return res.status(500).send({ Result: error1 });
    }

    // Perform the second query
    connection.query(query2, (error2, results2) => {
        if (error2) {
            return res.status(500).send({ Result: error2 });
        }
        
        res.status(200).send({ Result: "Success" });
    });
  });
};