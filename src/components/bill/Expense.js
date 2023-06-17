import React from "react";
import axios from "axios";
import { useState } from "react";
import "./Expense.css";
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import ExpenseItem from "./ExpenseItem";
import { ip_address } from "../../env.js";

const Expense = (props) => {
  const { partyId, memberList } = props;
  const [list, setList] = useState([]);
  const [prevLists, setPrevLists] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const api = `http://${ip_address}/bill-query-service/api/bill/${partyId}/${page}`;

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
        setHasNextPage(res.data.length === 10);
      })
      .catch((err) => {});
  }, [page]);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const getNextPage = () => {
    setPrevLists((prevLists) => [...prevLists, list]);
    setPage((prevPage) => prevPage + 1);
  };

  const getPrevPage = () => {
    setList(prevLists[prevLists.length - 1]);
    setPrevLists((prevLists) => prevLists.slice(0, prevLists.length - 1));
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <div className="expenses">
        {(showMore ? list : list.slice(0, 3)).map((data, index) => {
          return (
            <ExpenseItem
              key={index}
              billName={data.billName}
              totalAmount={data.totalAmount}
              billId={data.billId}
              createTime={data.createTime}
              memberList={memberList}
            />
          );
        })}
        {list.length > 3 && (
          <button onClick={toggleShowMore}>
            {showMore ? "Show less" : "Show more"}
          </button>
        )}
        {prevLists.length > 0 && (
          <button onClick={getPrevPage}>Prev page</button>
        )}
        {hasNextPage && <button onClick={getNextPage}>Next page</button>}
      </div>
    </div>
  );
};
export default Expense;
