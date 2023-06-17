import React from "react";
import { useState, useEffect } from "react";
import "./AdminButton.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { ip_address } from "../../env.js";

const AdminShowAllUsers = () => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [prevLists, setPrevLists] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const api = `http://${ip_address}/master-query-service/api/user/admin/findAll/${page}`;

  const fetchUsers = async () => {
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
    await fetchUsers();
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
            <th>UserId</th>
            <th>Username</th>
            <th>Name</th>
            <th>RegisterTime</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {list.map((data, index) => {
            return (
              <tr>
                <td>{data.userId}</td>
                <td>{data.username}</td>
                <td>{data.name}</td>
                <td>{data.registerTime.replace("T", " ")}</td>
                <td>{data.userStatus}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {<button onClick={fetchUsers}>Fetch users</button>}
      {prevLists.length > 0 && <button onClick={getPrevPage}>Prev page</button>}
      {hasNextPage && <button onClick={getNextPage}>Next page</button>}
    </div>
  );
};
export default AdminShowAllUsers;
