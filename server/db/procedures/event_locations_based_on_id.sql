CREATE PROCEDURE GetZipCodesForEventId(IN eventId INT)
    SELECT ZipCode
    FROM DisasterEventLocations
    WHERE EventId = eventId;