create procedure fetch_all_notifications_for_user(user_id int)
  select * from notifications where UserId = user_id;

create procedure notify_user(user_id int, message text)
  insert into notifications (UserId, Message, NotificationDate, NotificationRead) values (user_id, message, current_timestamp, false);

