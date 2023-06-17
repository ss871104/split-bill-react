import { useState, useRef, useEffect } from "react";
import "./BillDetail.css";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import { ip_address } from "../../env";
import axios from "axios";

const BillDetail = (props) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const { totalAmount, billId, memberList } = props;
  const [list, setList] = useState([]);
  const api = `http://${ip_address}/bill-query-service/api/billDetail/${billId}`;

  let map = memberList.reduce((acc, item) => {
    acc[item.memberId] = item.memberNickname;
    return acc;
  }, {});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    // clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);

    if (list.length === 0) {
      const getData = localStorage.getItem("token");
      const token = JSON.parse(getData);
      axios
        .get(api, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
        .then((res) => {
          setList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div ref={ref}>
      <Button className="BillDetail" onClick={handleClick}>
        Bill Details
      </Button>
      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Header as="h3">Bill Detail</Popover.Header>
          <Popover.Body>
            <div>Total Expense : $ {totalAmount.toLocaleString()}</div>
            <table>
              <thead>
                <tr>
                  <th style={{padding: "10px"}}>Member</th>
                  <th style={{padding: "10px"}}>Type</th>
                  <th style={{padding: "10px"}}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={index}>
                    <td style={{padding: "10px"}}>{map[item.memberId] ?? item.memberId}</td>
                    <td style={{padding: "10px"}}>{item.billDetailType}</td>
                    <td style={{padding: "10px"}}>$ {item.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}
export default BillDetail;