const NotificationExample = () => {

  function getNotifications() {
    fetch("http://localhost:3000/api/notifications/getnotifications/1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }
  
  function notifyUser() {
    fetch("http://localhost:3000/api/notifications/notifyuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ UserId: 1, NotificationMessage: "This is a super long message to see what it looks like when there is a longer message that goes here. blababalabalkba;slkdjf;alskdjf;laksjdf;alksjd" }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    }
    
    function readNotification() {
      fetch("http://localhost:3000/api/notifications/readnotification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notificationId: 1 }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }

  return (
    <div>
      <button onClick={getNotifications} className="p-2 bg-black rounded m-4">get notifications</button>
      <button onClick={notifyUser} className="p-2 bg-black rounded m-4">notify user</button>
      <button onClick={readNotification} className="p-2 bg-black rounded m-4">read notification</button>
    </div>
  );
}

export default NotificationExample;