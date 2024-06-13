CREATE PROCEDURE fetch_all_disaster_events_with_locations()
    SELECT de.*, del.EventZipCode
    FROM disasterevents de
    LEFT JOIN DisasterEventLocations del ON de.EventId = del.EventId;

CREATE PROCEDURE fetch_all_disaster_events_with_locations_combined()
    SELECT de.*, GROUP_CONCAT(del.EventZipCode) AS CombinedZipCodes
    FROM disasterevents de
    LEFT JOIN DisasterEventLocations del ON de.EventId = del.EventId
    GROUP BY de.EventId;
