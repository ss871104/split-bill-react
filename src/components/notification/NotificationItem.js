import React, { useState, useContext } from "react";
import { WebSocketContext } from './WebSocketContext';

const NotificationItem = ({ notification, allRead }) => {
  const [isRead, setIsRead] = useState(notification.read);
  const { ws, decreaseUnreadCount } = useContext(WebSocketContext);

  const handleClickForIndividualRead = () => {
    if (!isRead && ws) {
      ws.send(
        JSON.stringify({
          operation: "markAsRead",
          notificationId: notification.notificationId,
          userId: notification.userId,
          createTime: notification.createTime,
        })
      );

      setIsRead(true);
      decreaseUnreadCount();
    }
  };

  const readClassName = allRead || isRead ? "readNotification" : "unreadNotification";

  return (
    <div
      className={readClassName}
      onClick={handleClickForIndividualRead}
    >
      <hr />
      <h4 className="title">{notification.title}</h4>
      <p className="content">{notification.content}</p>
      <span className="time">{notification.createTime.replace("T", " ")}</span>
    </div>
  );
};
export default NotificationItem;
