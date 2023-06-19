import React, { useEffect } from "react";
import { ip_address } from "../env";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMemberPage = (props) => {
  const { inviteId } = props;
  const getData = localStorage.getItem("token");
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
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const addMemberApi = `http://${ip_address}/master-command-service/api/member/addMember?inviteId=${inviteId}`;
          axios
            .post(addMemberApi, null, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              alert("joined party!");
              navigate("/HomePage");
            })
            .catch((err) => {
              alert(err.response.data.message);
              navigate("/HomePage");
            });
        })
        .catch((err) => {
          alert("please login!");
          navigate("/");
        });
    }
  }, []);
};

export default AddMemberPage;
