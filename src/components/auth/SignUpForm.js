import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpForm.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ip_address } from "../../env.js";

const SignUpForm = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const api = `http://${ip_address}/auth-service/api/auth/register`;
  const [authtoken, setAuthToken] = useState(
    localStorage.getItem("token" || "")
  );
  const navigate = useNavigate();


  const handleSignUpForm = (event) => {
    if (password != confirmPassword) {
      window.alert("password and confirm password not match!");
    }
    axios
      .post(api, {
        username: username,
        password: password,
        name: name,
      })
      .then((res) => {
        const getToken = res.data.token;
        localStorage.setItem("token", JSON.stringify(getToken));
        setAuthToken(res.data.token);
        localStorage.setItem("username", JSON.stringify(username));
        window.alert("register successfully!")
        navigate("/HomePage");
      })
      .catch((err) => {
        if (err.response.data.message == null) {
          alert("register failed!");
        } else {
          alert(err.response.data.message);
        }
      });
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        SignUp
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign Up Now</Modal.Title>
        </Modal.Header>
        <form>
          <div className="SignUp-area">
            <div className="SignUp-box">
              <label>Name:</label><br />
              <input
                type="text"
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
                required
              ></input>
            </div>
            <div className="SignUp-box">
              <label>Username:</label><br />
              <input
                type="text"
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              ></input>
            </div>
            <div className="SignUp-box">
              <label>Password:</label><br />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              ></input>
            </div>
            <div className="SignUp-box">
              <label>Confirm Password:</label><br />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              ></input>
            </div>
          </div>
        </form>
        <Modal.Footer>
          <Button className="Sign-up-submit-button" onClick={handleSignUpForm}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default SignUpForm;
