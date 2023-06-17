import React from "react";
import axios from "axios";
import { ip_address } from "../../env";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTimes } from "@fortawesome/free-solid-svg-icons";

const DisableMember = (props) => {
  const { memberId } = props;
  const api = `http://${ip_address}/master-command-service/api/member/disableMember/${memberId}`;

  const handleClick = () => {
    if (window.confirm("Are you sure you want to kick this member?")) {
      const getData = localStorage.getItem("token");
      const token = JSON.parse(getData);
      axios
        .delete(api, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          window.alert("member deleted!");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          window.alert("delete member failed!");
        });
    }
  };

  return (
    <button style={{ background: "transparent", border: "none" }}>
      <FontAwesomeIcon icon={faUserTimes} onClick={handleClick} />
    </button>
  );
};

export default DisableMember;
