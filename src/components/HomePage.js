import React, { useEffect, useState } from "react";
import "../App.css";
import Head from "./Head";
import ShowParty from "./party/ShowParty";
import NotificationButton from "./notification/NotificationButton";
import Logout from "./Logout";
import { ip_address } from "../env";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const getData = localStorage.getItem("token");
  const [ username, setUsername ] = useState("");
  const [ userId, setUserId ] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!getData) {
      navigate("/");
    } else {
      const token = JSON.parse(getData);
      const api = `http://${ip_address}/master-query-service/api/user/info`;
      
      axios
        .get(api, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
        .then((res) => {
          setUsername(res.data.username);
          setUserId(res.data.userId);
        })
        .catch((err) => {
          alert("please login!");
          navigate("/");
        });
    }
  }, []);

  return (
    <div>
      <Head username={username}/>
      <ShowParty />
      <Logout />
      <NotificationButton userId={userId}/>
    </div>
  );
}

export default HomePage;
