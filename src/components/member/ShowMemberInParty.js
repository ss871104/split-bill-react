import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { ip_address } from "../../env.js";
import DisableMember from "./DisableMember.js";
import "./ShowMemberInParty.css";

const ShowMemberInParty = (props) => {
  const { partyId, memberList } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getData = localStorage.getItem("token");
  const token = JSON.parse(getData);
  const generateInviteUrlApi = `http://${ip_address}/master-command-service/api/member/generateInviteURL/${partyId}`;
  const [inviteUrl, setInviteUrl] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  let activeMemberList = memberList.filter(
    (member) => member.memberStatus !== "DISABLED"
  );

  const handleClick = () => {
    axios
      .get(generateInviteUrlApi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const newInviteUrl = `http://${ip_address}:3000/split-bill/AddMemberPage?inviteId=${res.data}`;
        setInviteUrl(newInviteUrl);
        navigator.clipboard.writeText(newInviteUrl).then(() => {
          window.alert(`Copy "${newInviteUrl}" in clipboard!`);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setIsDisabled(true);
    setTimeout(() => setIsDisabled(false), 60000); // 60000 毫秒 = 1 分鐘
  };

  return (
    <div>
      <button className="btn memberList" onClick={handleShow}>
        Member List
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Members List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table>
            <thead>
              <tr>
                <th style={{ padding: "10px" }}>Member Name</th>
                <th style={{ padding: "10px" }}>Balance</th>
                <th style={{ padding: "10px" }}>Joined Date</th>
                <th style={{ padding: "10px" }}></th>
              </tr>
            </thead>
            <tbody>
              {activeMemberList.map((item, index) => (
                <tr key={index}>
                  <td style={{ padding: "10px" }}>{item.memberNickname}</td>
                  <td style={{ padding: "10px" }}>
                    $ {item.balance.toLocaleString()}
                  </td>
                  <td style={{ padding: "10px" }}>
                    {item.createTime.split("T")[0]}
                  </td>
                  <td style={{ padding: "10px" }}>
                    <DisableMember memberId={item.memberId} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <input
            readOnly
            value={inviteUrl}
            style={{ width: "100%" }}
          />
          <button
            className="btn"
            onClick={handleClick}
          >
            Generate invite url
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ShowMemberInParty;
