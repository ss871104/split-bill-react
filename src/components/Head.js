import React from "react";
import "./Head.css";
import AddPartyPopup from "./party/AddPartyPopup.js";

const Head = (props) => {
  const { username } = props;

  return (
    <div className="Head">
      <div>
        <h1 className="Head-Welcome">{username}</h1>
      </div>
      <div className="add-party-button">
        <AddPartyPopup />
      </div>
    </div>
  );
}
export default Head;