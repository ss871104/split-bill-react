import "./Expense";
import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import BillDetail from "./BillDetail.js";
import DeleteBill from "./DeleteBill";

const ExpenseItem = (props) => {
  const { billName, totalAmount, billId, createTime, memberList } = props;

  return (
    <div>
      <div className="expense-party">
        <ExpenseDate createTime={createTime} />
        <div className="expense-name">
          <h3>{billName}</h3>
        </div>
        <div className="expense-name">
          <h3>$ {totalAmount.toLocaleString()}</h3>
        </div>
        <BillDetail
          totalAmount={totalAmount}
          billId={billId}
          memberList={memberList}
        />
        <DeleteBill billId={billId} className="deleteBill"/>
      </div>
    </div>
  );
};
export default ExpenseItem;
