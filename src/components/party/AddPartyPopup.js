import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { ip_address } from "../../env.js";

const AddPartyPopup = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [partyName, setPartyName] = useState("");
  const api = `http://${ip_address}/master-command-service/api/party/addParty`;

  const handleSubmit = (e) => {
    const getData = localStorage.getItem("token");
    const token = JSON.parse(getData);
    axios
      .post(
        api,
        {
          partyName: partyName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        handleClose();
        window.alert("party added!")
        window.location.reload();
      })
      .catch((err) => {
        window.alert("add party failed!")
      });
  }
  return (
    <div>
      <button className="btn" onClick={handleShow}>
        Add Party
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Party</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Party Name</Form.Label>
              <Form.Control
                type="Party Name"
                placeholder="Party Name"
                onChange={(e) => setPartyName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn" onClick={handleSubmit}>
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );


}
export default AddPartyPopup;