import React from "react";
import "./Login.css";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div>
      <div className="menu">
        <svg className="logo-box desktop">
          <text x="50%" y="70%" fill="white" className="logo">
            Split Bill App
          </text>
        </svg>
        <div className="logo-box mobile">Split Bill App</div>
        <div className="button-container">
          <LoginForm />
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};
export default Login;
