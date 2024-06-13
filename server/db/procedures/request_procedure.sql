create procedure fetch_all_unfulfilled_requests()
SELECT Requests.*, DisasterEvents.EventName, Users.Email
    FROM Requests
    INNER JOIN DisasterEvents ON Requests.EventId = DisasterEvents.EventId
    INNER JOIN Users ON Requests.UserId = Users.UserId
    WHERE Requests.RequestStatus = 1

create procedure fetch_all_active_requests_by_userid(IN user_id INT)
SELECT 
    R.RequestId,
    R.RequestQuantity,
    R.Category AS RequestCategory,
    DE.EventName
FROM 
    Requests R
JOIN 
    DisasterEvents DE ON R.EventId = DE.EventId
WHERE 
    R.UserId = user_id
    AND R.RequestStatus = 1;