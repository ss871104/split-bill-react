import React, { useState } from "react";
import axios from "axios";
import PartyDetail from "./PartyDetail";
import { ip_address } from "../../env.js";

const ShowParty = () => {
  const [list, setList] = useState([]);
  const api = `http://${ip_address}/master-query-service/api/party/info`;
  React.useEffect(() => {
    const getData = localStorage.getItem("token");
    const token = JSON.parse(getData);
    axios
      .get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      {list.map((data, index) => {
        return (
          <PartyDetail
            key={index}
            partyName={data.partyName}
            partyId={data.partyId}
          />
        );
      })}
    </div>
  );
};
export default ShowParty;
