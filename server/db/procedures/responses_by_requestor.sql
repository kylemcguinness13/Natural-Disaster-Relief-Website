create procedure fetch_all_donations_by_userid(IN user_id INT)
SELECT 
	R.RequestId AS RequestId,
    R.Category AS RequestCategory,
    U.Email AS DonorEmail,
    DE.EventName,
    U.ZipCode AS ResponderZipCode,
    RS.Quantity AS ResponseQuantity
FROM 
    Requests R
JOIN 
    Responses RS ON R.RequestId = RS.RequestId
JOIN 
    Users U ON RS.UserId = U.UserId
JOIN 
    DisasterEvents DE ON R.EventId = DE.EventId
WHERE 
    R.UserId = user_id;