import React from "react";
import { useState } from "react";
import "./AdminButton.css";
import axios from "axios";
import { ip_address } from "../../env.js";
import Table from "react-bootstrap/Table";

const AdminShowAllMembers = () => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [prevLists, setPrevLists] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const api = `http://${ip_address}/master-query-service/api/member/admin/findAll/${page}`;

  const fetchMembers = async () => {
    try {
      const getData = localStorage.getItem("token");
      const token = JSON.parse(getData);
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setList(response.data);
      setHasNextPage(response.data.length === 10);
    } catch (err) {
      console.error(err);
    }
  };

  const getNextPage = async () => {
    setPrevLists((prevLists) => [...prevLists, list]);
    setPage((prevPage) => prevPage + 1);
    await fetchMembers();
  };

  const getPrevPage = () => {
    setList(prevLists[prevLists.length - 1]);
    setPrevLists((prevLists) => prevLists.slice(0, prevLists.length - 1));
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>MemberId</th>
            <th>PartyId</th>
            <th>UserId</th>
            <th>Nickname</th>
            <th>Balance</th>
            <th>CreateTime</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {list.map((data, index) => {
            return (
              <tr>
                <td>{data.memberId}</td>
                <td>{data.partyId}</td>
                <td>{data.userId}</td>
                <td>{data.memberNickname}</td>
                <td>{data.balance}</td>
                <td>{data.createTime.replace("T", " ")}</td>
                <td>{data.memberStatus}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {<button onClick={fetchMembers}>Fetch members</button>}
      {prevLists.length > 0 && <button onClick={getPrevPage}>Prev page</button>}
      {hasNextPage && <button onClick={getNextPage}>Next page</button>}
    </div>
  );
}
export default AdminShowAllMembers;