import React from "react";
import axios from "axios";
import { ip_address } from "../../env";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const DeleteBill = (props) => {
    const { billId } = props;
    const api = `http://${ip_address}/bill-command-service/api/bill/removeBill/${billId}`;

    const handleClick = () => {
      if (window.confirm("Are you sure you want to delete this bill?")) {
        const getData = localStorage.getItem("token");
      const token = JSON.parse(getData);
      axios
        .delete(api, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          window.alert("bill deleted!")
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          window.alert("delete bill failed!")
        });
      }
    };

    return (
      <button style={{ background: 'transparent', border: 'none' }}>
        <FontAwesomeIcon icon={faTrash} onClick={handleClick} />
      </button>
    );
}

export default DeleteBill;