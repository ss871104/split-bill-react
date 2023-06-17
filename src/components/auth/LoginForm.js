import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ip_address } from "../../env.js";

import "./LoginForm.css";

const LoginForm = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const api = `http://${ip_address}/auth-service/api/auth/login`;
  const [authtoken, setAuthToken] = useState(
    localStorage.getItem("token" || "")
  );
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(api,
        {
          'username': username,
          'password': password
        })
      .then((res) => {
        const getToken = res.data.token;
        localStorage.setItem("token", JSON.stringify(getToken));
        setAuthToken(getToken);
        navigate("/split-bill/HomePage");
      })
      .catch((err) => {
        if (err.response.data.message == null) {
          alert("login failed!");
        } else {
          alert(err.response.data.message);
        }
      });
  };
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        LogIn
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login Now</Modal.Title>
        </Modal.Header>
        <form>
          <div className="Login-area">
            <div className="Login-box">
              <label>Username: </label><br />
              <input
                type="text"
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              ></input>
            </div>
            <div className="Login-box">
              <label>Password: </label><br />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              ></input>
            </div>
          </div>
        </form>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default LoginForm;
