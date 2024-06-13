create procedure fetch_all_responses_by_userid(IN user_id INT)
SELECT
	RS.ResponseId AS ResponseId,
    RS.Quantity AS ResponseQuantity,
    UR.Email AS ResponseEmail,
    UR.ZipCode AS ResponseZipCode,
    DE.EventName,
    C.Category AS RequestCategory,
    UR2.Email AS RequestEmail,
    UR2.ZipCode AS RequestZipCode
FROM 
    Responses RS
JOIN 
    Users UR ON RS.UserId = UR.UserId
JOIN 
    Requests R ON RS.RequestId = R.RequestId
JOIN 
    Categories C ON R.Category = C.Category
JOIN 
    DisasterEvents DE ON R.EventId = DE.EventId
JOIN 
    Users UR2 ON R.UserId = UR2.UserId
WHERE 
    RS.UserId = user_id;