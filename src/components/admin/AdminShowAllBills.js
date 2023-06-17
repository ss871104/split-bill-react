import React from "react";
import { useState } from "react";
import "./AdminButton.css";
import axios from "axios";
import { ip_address } from "../../env.js";
import Table from "react-bootstrap/Table";
import BillDetail from "../bill/BillDetail.js";

const AdminShowAllBills = () => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [prevLists, setPrevLists] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [memberList, setMemberList] = useState([]);
  const api = `http://${ip_address}/bill-query-service/api/bill/admin/findAll/${page}`;

  const fetchBills = async () => {
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
    await fetchBills();
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
            <th>BillId</th>
            <th>PartyId</th>
            <th>BillName</th>
            <th>BillType</th>
            <th>TotalAmount</th>
            <th>CreateTime</th>
            <th>BillDetail</th>
          </tr>
        </thead>
        <tbody>
          {list.map((data, index) => {
            return (
              <tr>
                <td>{data.billId}</td>
                <td>{data.partyId}</td>
                <td>{data.billName}</td>
                <td>{data.billType}</td>
                <td>{data.totalAmount}</td>
                <td>{data.createTime.replace("T", " ")}</td>
                <td>
                  <BillDetail
                    totalAmount={data.totalAmount}
                    billId={data.billId}
                    memberList={memberList}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {<button onClick={fetchBills}>Fetch bills</button>}
      {prevLists.length > 0 && <button onClick={getPrevPage}>Prev page</button>}
      {hasNextPage && <button onClick={getNextPage}>Next page</button>}
    </div>
  );
};
export default AdminShowAllBills;
