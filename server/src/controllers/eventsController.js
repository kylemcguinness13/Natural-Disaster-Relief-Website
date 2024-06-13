const getConnection = require("../../db/db");

exports.getEvents = async (req, res) => {
  const connection = getConnection();

  const query = "CALL fetch_all_disaster_events_with_locations_combined();";

  connection.query(query, (error, results) => {
    connection.end();
    if (error) return res.status(500).send(error);
    res.status(200).send(results[0]);
  });
};
exports.getEventLocations = async (req, res) => {
  const connection = getConnection();
  const eventid = parseInt(req.params.eventId);
  const query = "CALL get_zip_codes_for_event_id(" + eventid + ");";

  connection.query(query, (error, results) => {
    connection.end();
    if (error) return res.status(500).send(error);
    res.status(200).send(results[0]);
  });
};

exports.updateEvent = async (req, res) => {
  const connection = getConnection();
  const {
    EventId,
    EventName,
    StartDate,
    EndDate,
    EventDescription,
    EventStatus,
    EventUrgency,
  } = req.body;
  const query =
    "UPDATE disasterevents SET EventName = '" +
    EventName +
    "', StartDate = '" +
    StartDate +
    "', EndDate = '" +
    EndDate +
    "', EventDescription = '" +
    EventDescription +
    "', EventStatus = '" +
    EventStatus +
    "', EventUrgency = '" +
    EventUrgency +
    "' WHERE EventId = " +
    EventId +
    ";";
  connection.query(query, (error, results) => {
    connection.end();
    if (error) return res.status(500).send(error);
    res.status(200).send({ message: "Event updated successfully" });
  });
};

exports.createEvent = async (req, res) => {
  const connection = getConnection();
  const {
    EventName,
    StartDate,
    EndDate,
    EventDescription,
    EventStatus,
    EventUrgency,
    ZipCodes,
  } = req.body;


  const query = `INSERT INTO disasterevents (EventName, StartDate, EndDate, EventDescription, EventStatus, EventUrgency) VALUES ('${EventName}', '${StartDate}', '${EndDate}', '${EventDescription}', '${EventStatus}', '${EventUrgency}');`;
  connection.query(query, (error, results) => {
    connection.end();
    if (error) {
      return res.status(500).send(error);
    }
    const newConnection = getConnection();
    const zips = ZipCodes.trim().split(",");
    const zipsValueString = zips
      .map((zip) => `(${results.insertId}, ${zip})`)
      .join(",");
    const query2 = `INSERT INTO DisasterEventLocations (EventId, EventZipCode) VALUES ${zipsValueString};`;
    newConnection.query(query2, (error2, results2) => {
      newConnection.end();
      if (error2) {
        return res.status(500).send(error2);
      }
    });
    res.status(200).send({
      message: "Event created successfully",
      eventId: results.insertId,
    });
  });
};
