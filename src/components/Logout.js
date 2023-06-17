import { ip_address } from "../env";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./Logout.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const getData = localStorage.getItem("token");
  const token = JSON.parse(getData);
  const api = `http://${ip_address}/auth-service/api/auth/logout`;
  const navigate = useNavigate();

  const handleClick = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      axios
        .get(api, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          alert("logout successfully!");
          navigate("/split-bill");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  };

  return (
    <div className="logout" onClick={handleClick}>
      <FontAwesomeIcon icon={faSignOutAlt} size="3x" />
    </div>
  );
};
export default Logout;
