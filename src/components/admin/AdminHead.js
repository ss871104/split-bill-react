import React from "react";
import "./AdminHead.css";
import "./AdminButton.css"

const Head = ({ onViewChange }) => {
  return (
    <div className="admin_head">
      <button className="btn" onClick={() => onViewChange('users')}>
        All Users
      </button>
      <button className="btn" onClick={() => onViewChange('parties')}>
        All Parties
      </button>
      <button className="btn" onClick={() => onViewChange('members')}>
        All Members
      </button>
      <button className="btn" onClick={() => onViewChange('bills')}>
        All Bills
      </button>
    </div>
  );
}
export default Head;