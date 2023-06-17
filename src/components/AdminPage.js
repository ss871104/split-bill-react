import React, { useEffect, useState } from "react";
import AdminHead from "./admin/AdminHead";
import { ip_address } from "../env";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminShowAllUsers from "./admin/AdminShowAllUsers.js";
import AdminShowAllPartys from "./admin/AdminShowAllPartys.js";
import AdminShowAllMembers from "./admin/AdminShowAllMembers.js";
import AdminShowAllBills from "./admin/AdminShowAllBills.js";

const AdminPage = () => {
  const [view, setView] = useState(null);
    const getData = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!getData) {
          navigate("/");
        } else {
          const token = JSON.parse(getData);
          const api = `http://${ip_address}/master-query-service/api/user/info`
          axios
            .get(api, {
              headers: {
                'Authorization': `Bearer ${token}`,
              }
            })
            .then((res) => {
              if (res.data.username != "andyuser") {
                alert("unauthorized");
                navigate("/");
              } 
            })
            .catch((err) => {
              alert("please login!");
              navigate("/");
            });
        }
      }, []);

      const handleButtonClick = (viewName) => {
        setView(viewName);
      };
    
      return(
        <div>
          <AdminHead onViewChange={handleButtonClick} />
          <div>
            {view === 'users' && <AdminShowAllUsers />}
            {view === 'parties' && <AdminShowAllPartys />}
            {view === 'members' && <AdminShowAllMembers />}
            {view === 'bills' && <AdminShowAllBills />}
          </div>
        </div>
      )
}
export default AdminPage;