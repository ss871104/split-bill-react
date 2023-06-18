import React, { useEffect } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import WelcomePage from "./components/WelcomePage";
import AdminPage from "./components/AdminPage";
import AddMemberPage from "./components/AddMemberPage";
import { BrowserRouter, Route, Link, Routes, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/HomePage" element={<HomePage />} />
      <Route path="/AdminPage" element={<AdminPage />} />
      <Route path="/AddMemberPage" element={<AddMember />} />
    </Routes>
  );
}

const AddMember = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const inviteId = queryParams.get('inviteId');

  return <AddMemberPage inviteId={inviteId}/>;
};

export default App;
