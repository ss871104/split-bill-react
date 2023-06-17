import React, { useState } from "react";
import Expense from "../bill/Expense";
import AddBill from "../bill/AddBill";
import './PartyDetail.css';
import ShowMemberInParty from '../member/ShowMemberInParty';
import axios from "axios";
import { ip_address } from "../../env.js";

const PartyDetail = (props) => {
  const { partyName, partyId } = props;
  const getData = localStorage.getItem("token");
  const token = JSON.parse(getData);
  const api = `http://${ip_address}/master-query-service/api/member/partyId/${partyId}`;
  const [memberList, setMemberList] = useState([]);

  React.useEffect(() => {
    axios
      .get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMemberList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="expenses">
      <div className="party-top-area">
        <h2 className="party-name">{partyName}</h2>
        <AddBill partyId={partyId} memberList={memberList}/>
        <ShowMemberInParty partyId={partyId} memberList={memberList}/>
      </div>
      <Expense partyId={partyId} memberList={memberList}/>
    </div>
  );

}
export default PartyDetail;