import React, { useContext, useState } from "react";
import "./NotificationDropdown.css";
import { WebSocketContext } from './WebSocketContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import NotificationItem from "./NotificationItem";

const NotificationDropdown = (props) => {
  const { notificationList, userId, unreadCount } = props;
  const { ws, clearUnreadCount } = useContext(WebSocketContext);
  const [allRead, setAllRead] = useState(false);

  const handleClick = (event) => {
    // 阻止事件冒泡，防止點擊列表時觸發外層的點擊事件
    event.stopPropagation();
  };

  const handleClickForAllRead = () => {
    ws.send(
      JSON.stringify({
        operation: "markAllAsRead",
        userId: userId,
      })
    );

    setAllRead(true);
    clearUnreadCount();
  };

  const dropdownClass = notificationList.length > 3 ? "dropdown dropdown-scrollable" : "dropdown";

  return (
    <div className={dropdownClass} onClick={handleClick}>
      <div className="read-all" onClick={handleClickForAllRead}>
        <FontAwesomeIcon icon={faCheckDouble} /> Read All
      </div>
      {notificationList.map((notification, index) => (
        <NotificationItem key={index} notification={notification} allRead={allRead} />
      ))}
    </div>
  );
};
export default NotificationDropdown;
