CREATE PROCEDURE GetPledgesByCategory(IN inputCategory VARCHAR(255))
    SELECT P.PledgeId, U.ZipCode AS UserZipCode, P.UserId, P.Quantity
    FROM Pledges P
    JOIN Users U ON P.UserId = U.UserId
    WHERE P.Category = inputCategory;