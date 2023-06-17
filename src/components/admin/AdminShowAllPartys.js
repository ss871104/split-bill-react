import React from "react";
import { useState } from "react";
import "./AdminButton.css";
import axios from "axios";
import { ip_address } from "../../env.js";
import Table from "react-bootstrap/Table";

const AdminShowAllPartys = () => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [prevLists, setPrevLists] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const api = `http://${ip_address}/master-query-service/api/party/admin/findAll/${page}`;

  const fetchPartys = async () => {
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
    await fetchPartys();
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
            <th>PartyId</th>
            <th>PartyName</th>
            <th>createTime</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {list.map((data, index) => {
            return (
              <tr>
                <td>{data.partyId}</td>
                <td>{data.partyName}</td>
                <td>{data.createTime.replace("T", " ")}</td>
                <td>{data.partyStatus}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {<button onClick={fetchPartys}>Fetch partys</button>}
      {prevLists.length > 0 && <button onClick={getPrevPage}>Prev page</button>}
      {hasNextPage && <button onClick={getNextPage}>Next page</button>}
    </div>
  );
};
export default AdminShowAllPartys;
