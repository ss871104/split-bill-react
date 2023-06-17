import React, { useState, useEffect } from "react";
import "./NotificationButton.css";
import NotificationDropdown from "./NotificationDropdown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { ip_address } from "../../env";
import { WebSocketContext } from './WebSocketContext';

const NotificationButton = (props) => {
  const { userId } = props;
  const [notificationList, setNotificationList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const ws = new WebSocket(`ws://${ip_address}/notification?userId=${userId}`);
  
  useEffect(() => {
    if (userId) {
      ws.onopen = () => {
        console.log('Connected to websocket');
      };
      
      ws.onmessage = (message) => {
        const dataList = JSON.parse(message.data);

        setNotificationList((currentList) => {
          // 創建一個新的通知列表，只包含那些當前沒有在列表中的通知
          const newNotifications = dataList.filter(data =>
            !currentList.some(notification => notification.notificationId === data.notificationId)
          );
      
          // 返回新的通知列表
          return [...currentList, ...newNotifications];
        });

        // 計算新添加的通知中未讀的數量，並增加未讀計數
        const newUnreadCount = dataList.reduce((count, data) => count + (data.read ? 0 : 1), 0);
        setUnreadCount((currentCount) => currentCount + newUnreadCount);
      };
      
      ws.onerror = (error) => {
        console.log('WebSocket error: ', error);
      };
      
      ws.onclose = () => {
        console.log('Disconnected from websocket');
      };
  
      // 斷開連接當組件卸載時
      return () => ws.close();
    }
  }, [userId])

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const decreaseUnreadCount = () => {
    setUnreadCount(count => count > 0 ? count - 1 : 0);
  };

  const clearUnreadCount = () => {
    setUnreadCount(0);
  };

  return (
    <WebSocketContext.Provider value={{ ws, decreaseUnreadCount, clearUnreadCount }}>
      <div className="notification" onClick={handleButtonClick}>
        <FontAwesomeIcon icon={faBell} size="3x" />
  
        {unreadCount > 0 && (
          <span className="unread">
            {unreadCount}
          </span>
        )}
  
        {isOpen && <NotificationDropdown notificationList={notificationList} userId={userId} unreadCount={unreadCount}/>}
      </div>
    </WebSocketContext.Provider>
  );
};
export default NotificationButton;