import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "./AddBill.css";
import { ip_address } from "../../env.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const AddBill = (props) => {
  const { partyId, memberList } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getData = localStorage.getItem("token");
  const token = JSON.parse(getData);
  const [totalAmount, setTotalAmount] = useState(0);
  const [billName, setBillName] = useState("");
  const [billType, setBillType] = useState("");
  const [expenseList, setExpenseList] = useState([
    { memberId: "", amount: "" },
  ]);

  const [incomeList, setIncomeList] = useState([
    { memberId: "", amount: "" },
  ]);

  let activeMemberList = memberList.filter(member => member.memberStatus !== 'DISABLED');

  const handldeSubmit = () => {
    if (billName.trim() == "") {
      window.alert("bill name is blank!");
      return;
    }
    if (totalAmount == 0) {
      window.alert("total amount is blank!");
      return;
    }
    if (billType == "0" || billType == "1" || billType == "2") {
    } else {
      window.alert("bill type must be chosen!");
      return;
    }
    // check "Who Need to Pay" list
    for (let item of expenseList) {
      if (item.memberId == "0" || item.memberId == "") {
        window.alert("A user from 'Who Needs to Pay' is not selected!");
        return;
      }
    }

    // check "Who Pay the Bill" list
    for (let item of incomeList) {
      if (item.memberId == "0" || item.memberId == "") {
        window.alert("A user from 'Who Pay the Bill' is not selected!");
        return;
      }
    }

    if (billType == "1") {
      let incomeTotalAmount = 0;
      for (let item of incomeList) {
        incomeTotalAmount += parseInt(item.amount);
      }
      if (incomeTotalAmount != totalAmount) {
        window.alert("Amount of 'Who Pay the Bill' should equal to Total Amount!");
        return;
      }
    }

    if (billType == "0" || billType == "2") {
      let incomeTotalAmount = 0;
      let expenseTotalAmount = 0;
      for (let item of incomeList) {
        incomeTotalAmount += parseInt(item.amount);
      }
      for (let item of expenseList) {
        expenseTotalAmount += parseInt(item.amount);
      }
      if (expenseTotalAmount != totalAmount) {
        window.alert("Amount of 'Who Needs to Pay' should equal to Total Amount!");
        return;
      }
      if (incomeTotalAmount != totalAmount) {
        window.alert("Amount of 'Who Pay the Bill' should equal to Total Amount!");
        return;
      }
    }

    const api = `http://${ip_address}/bill-command-service/api/bill/addBill`;
    let expenseMap = expenseList.reduce((acc, item) => {
      acc[item.memberId] = item.amount;
      return acc;
    }, {});
    let incomeMap = incomeList.reduce((acc, item) => {
      acc[item.memberId] = item.amount;
      return acc;
    }, {});

    axios
      .post(api, {
          billName: billName,
          partyId: partyId,
          totalAmount: totalAmount,
          memberIdMapExpense: expenseMap,
          memberIdMapIncome: incomeMap,
          billType: billType,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        handleClose();
        window.alert("bill added!")
        window.location.reload();
      })
      .catch((err) => {
        console.log("add bill failed!");
      });
  };
  // below functions are "expenseList"
  const handleExpenseListInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...expenseList];
    list[index][name] = value;
    setExpenseList(list);
  };

  const handleExpenseListAddClick = () => {
    setExpenseList([...expenseList, { memberId: "", amount: "" }]);
  };

  const handleExpenseListRemoveClick = (index) => {
    const list = [...expenseList];
    list.splice(index, 1);
    setExpenseList(list);
  };
  // below functions are "incomeList"
  const handleIncomeListInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...incomeList];
    list[index][name] = value;
    setIncomeList(list);
  };
  const handleIncomeListAddClick = () => {
    setIncomeList([
      ...incomeList,
      { memberId: "", amount: "" },
    ]);
  };

  const handleIncomeListRemoveClick = (index) => {
    const list = [...incomeList];
    list.splice(index, 1);
    setIncomeList(list);
  };

  // below function is "bill type"
  const handleBillType = (e) => {
    setBillType(e.target.value);
  };
  return (
    <div>
      <button className="btn addBill" onClick={handleShow}>
        Add Bill
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Bill</Modal.Title>
        </Modal.Header>
        <form>
          <div>
            <div className="input-box">
              <div className="label-box">
                <h3>Bill Details</h3>
              </div>
              <div className="bill-Type-box">
                <input
                  className="text"
                  name="BillName"
                  placeholder="Bill name"
                  onChange={(e) => setBillName(e.target.value)}
                ></input>
                <input
                  className="text"
                  type="number"
                  name="Total Amount"
                  placeholder="Total Amount"
                  onChange={(e) => setTotalAmount(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="input-box">
              <div className="label-box">
                <h3>Bill Type</h3>
              </div>
              <div className="bill-Type-box">
                <div>
                  <label htmlFor="AA">AA</label>
                  <input
                    type="radio"
                    id="AA"
                    value="1"
                    name="billType"
                    onChange={handleBillType}
                  ></input>
                </div>
                <div>
                  <label htmlFor="Transfer">Transfer</label>
                  <input
                    type="radio"
                    id="Transfer"
                    value="0"
                    name="billType"
                    onChange={handleBillType}
                  ></input>
                </div>
                <div>
                  <label htmlFor="GoDutch">GoDutch</label>
                  <input
                    type="radio"
                    id="GoDutch"
                    value="2"
                    name="billType"
                    onChange={handleBillType}
                  ></input>
                </div>
              </div>
            </div>
            <div className="input-box">
              <div className="label-box">
                <h3>Who needs to pay</h3>
              </div>
              {expenseList.map((x, i) => {
                return (
                  <div className="bill-Type-box" key={i}>
                    <select
                      name="memberId"
                      value={x.memberId}
                      onChange={(e) => handleExpenseListInputChange(e, i)}
                    >
                      <option value="0">please select member</option>
                      {activeMemberList.map((member, index) => (
                        <option key={index} value={member.memberId}>
                          {member.memberNickname}
                        </option>
                      ))}
                    </select>
                    <input
                      className="text"
                      type="number"
                      name="amount"
                      value={x.amount}
                      placeholder="amount"
                      onChange={(e) => handleExpenseListInputChange(e, i)}
                    />
                    <div>
                      {expenseList.length !== 1 && (
                        <button type="button" style={{ background: 'transparent', border: 'none', marginRight: '10px' }}>
                          <FontAwesomeIcon icon={faMinus} onClick={() => handleExpenseListRemoveClick(i)} />
                        </button>
                      )}
                      {expenseList.length - 1 === i && (
                        <button type="button" style={{ background: 'transparent', border: 'none' }}>
                          <FontAwesomeIcon icon={faPlus} onClick={handleExpenseListAddClick} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="input-box">
              <div className="label-box">
                <h3>Who pay the bill</h3>
              </div>
              <div>
                {incomeList.map((x, i) => {
                  return (
                    <div className="bill-Type-box" key={i}>
                      <select
                        name="memberId"
                        value={x.memberId}
                        onChange={(e) => handleIncomeListInputChange(e, i)}
                      >
                        <option value="0">please select member</option>
                        {activeMemberList.map((member, index) => (
                          <option key={index} value={member.memberId}>
                            {member.memberNickname}
                          </option>
                        ))}
                      </select>
                      <input
                        className="text"
                        type="number"
                        name="amount"
                        value={x.amount}
                        placeholder="amount"
                        onChange={(e) => handleIncomeListInputChange(e, i)}
                      />
                      <div>
                        {incomeList.length !== 1 && (
                          <button type="button" style={{ background: 'transparent', border: 'none', marginRight: '10px' }}>
                            <FontAwesomeIcon icon={faMinus} onClick={() => handleIncomeListRemoveClick(i)} />
                          </button>
                        )}
                        {incomeList.length - 1 === i && (
                          <button type="button" style={{ background: 'transparent', border: 'none' }}>
                            <FontAwesomeIcon icon={faPlus} onClick={handleIncomeListAddClick} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </form>
        <Modal.Footer>
          <button type="button" className="btn" onClick={handldeSubmit}>
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default AddBill;
